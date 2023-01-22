import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router, { useRouter } from 'next/router'
import { api } from "../service/axios";
import jwt_decode from "jwt-decode";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

  const { 'auth.token': token } = parseCookies()



  // const tokenExist = useQuery(["verifyAuthToken"], async () => await api.get('/recoveryUser',{
  //   headers: {
  //     'Authorization': `token ${token}`
  //   }
  // }).then(response => {
  //   setUser(response.data)
  // }))

  async function recoveryUser(){
    const response = api.get('/recoveryUser',{
      headers: {
        'Authorization': `token ${token}`
      }
    }).then(response => {
      console.log("recoveryUser", response)
      return response.data
    })
   
     return response;
   }


    const verifyToken = useQuery({
      queryKey: ["session"],
      queryFn: recoveryUser
    })
   


  const isAuthenticated = !!user;

  // const {mutate:login}:any = useMutation(["session"], async(data: SignInData) => {
    
  // });

  async function verifyPasswordAndEmail(data: SignInData){
    const loginPost = await api.post('/login', data).then(response => response.data);
    console.log("data", loginPost)
    
    const token = loginPost.token

    const decoded:any = await jwt_decode(token);

    console.log("decoded.user", decoded.user)

    setCookie(undefined, 'auth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    return decoded.user

   }

  const login = useMutation({
    mutationFn: verifyPasswordAndEmail,
    onSuccess: () => {
      push('/profile');    
    },
  })

   function signIn(data: SignInData) {
    try { 
      login.mutate(data);

    } catch (error) {
      console.error(error);
    }
  }

  const session = login.data || verifyToken.data


  return (
    <AuthContext.Provider value={{ user, signIn, session, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}