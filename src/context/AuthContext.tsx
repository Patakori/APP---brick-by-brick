import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router, { useRouter } from 'next/router'
import { api } from "../axios/axios";
import jwt_decode from "jwt-decode";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UserServices from "../services/userServices";
import { RecoveryUserQuery } from "../querys/recoveryUserQuery";

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
  signIn: any
  isAuthenticated:  boolean;
  session: any
}

interface ResponseData {
  data:{
    token: string;
    user: User
  }
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }:any) {

  const {push} = useRouter()
  // Informações do usuário
  const [user, setUser] = useState<any>()
  const queryClient = useQueryClient()

  // const { 'auth.token': token } = parseCookies()

  // async function recoveryUser(){
  //   const response = api.get('/recoveryUser',{
  //     headers: {
  //       'Authorization': `token ${token}`
  //     }
  //   }).then(response => {
  //     console.log("recoveryUser", response)
  //     return response.data
  //   })
   
  //    return response;
  //  }

  // const recoveryUser = UserServices.recoveryUser(token)


  //   const verifyToken = useQuery({
  //     queryKey: ["session"],
  //     queryFn: () => recoveryUser
  //   })

  const verifyToken = RecoveryUserQuery()
   
  const isAuthenticated = !!user;

  async function verifyPasswordAndEmail(data: SignInData){
    const loginPost = await api.post('/login', data)
    console.log("data", loginPost)
    
    const token = loginPost.data.token

    const decoded:any = await jwt_decode(token);

    console.log("decoded.user", decoded.user)

    setCookie(undefined, 'auth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    return decoded.user

   }

  //  const verify = UserServices.verifyPasswordAndEmail

  const login = useMutation({
    mutationFn: verifyPasswordAndEmail,
    onSuccess: () => {
      push('/profile');    
    },
  })

   function signIn(data: SignInData) {
    try { 
      const verify = UserServices.verifyPasswordAndEmail(data)

      console.log(verify)
      
      login.mutate(data)

      console.log(login.mutate(data))

    } catch (error) {
      console.error(error);
    }
  }

  const session = login?.data || verifyToken?.data


  return (
    <AuthContext.Provider value={{ user, signIn, session, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}