import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from "../service/axios";
import jwt_decode from "jwt-decode";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface User {
  name: string;
  email: string;
  avatar_url?: string;
} 

interface SignInData {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (data: SignInData) => Promise<void>
  isAuthenticated:  boolean
}

interface ResponseData {
  data:{
    token: string;
    user: User
  }
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }:any) {
  // Informações do usuário
  const [user, setUser] = useState<any>()
  const queryClient = useQueryClient()

  const { 'auth.token': token } = parseCookies()

  useQuery("verifyAuthToken", () => api.get('/recoveryUser',{
    headers: {
      'Authorization': `token ${token}`
    }
  }).then(response => {
    console.log("response", response)
    setUser(response.data)
  }))

  const isAuthenticated = !!user;

  const {mutate:login}:any = useMutation("", async(data: SignInData) => {
    const loginPost = await api.post('/login', data).then(response => response.data);
    console.log("data", loginPost)
    
    const token = loginPost.token
    console.log("token", token)

    const decoded:any = await jwt_decode(token);

    console.log("decoded.user", decoded)

    setUser(decoded.user)

    setCookie(undefined, 'auth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    Router.push('/profile');
  });

  async function signIn(data: SignInData) {
    try {
      await login(data);

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <AuthContext.Provider value={{ user, signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}