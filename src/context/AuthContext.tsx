import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from "../service/api";


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
  const [user, setUser] = useState<User | null>(null)

  // const isAuthenticated = !!user;

  useEffect(() => {
   

    if(!user){
      const { 'nextauth.token': token } = parseCookies()

      if(token){

        api.get('/user').then((response: { data: { name: any; email: any; }; })=>{
          const user: User = {
            name: response.data.name,
            email: response.data.email
          }

          setUser(user)
        })
  

      }
    }




    
  }, [])

  async function signIn({ email, password }: SignInData) {

    const data:ResponseData = await api.post('/login', { email, password })

    const token = data.data.token
    setUser(data.data.user)

    console.log("dataaaa", data.data.user)

    setCookie(undefined, 'auth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    Router.push('/profile');
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}