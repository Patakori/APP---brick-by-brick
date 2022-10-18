import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from "../service/axios";
import jwt_decode from "jwt-decode";

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
  
  useEffect(() => {
    const { 'auth.token': token } = parseCookies()

    console.log("EFFECT", token)

    if (token) {
      console.log("response")
      api.get('/recoveryUser',{
        headers: {
          'Authorization': `token ${token}`
        }
      }).then(response => {
        console.log("response", response)
        setUser(response.data)
      })
    }
  }, [])

  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInData) {

    const data:ResponseData = await api.post('/login', { email, password })

    const token = data.data.token
    const decoded:any = jwt_decode(token);
    setUser(decoded.user)

    console.log("dataaaa", decoded.user)

    setCookie(undefined, 'auth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    Router.push('/profile');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}