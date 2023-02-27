import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router, { useRouter } from 'next/router'
import { api } from "../axios/axios";
import jwt_decode from "jwt-decode";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RecoveryUserQuery } from "../querys/recoveryUserQuery";
import { VerifyPasswordAndEmail } from "../querys/verifyPasswordAndEmail";

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

  const [user, setUser] = useState<any>()

  const verifyToken = RecoveryUserQuery()
   
  const isAuthenticated = !!user;

  const login = VerifyPasswordAndEmail()

  function signIn(data: SignInData) {
    console.log(data)
    try { 
      
      login.mutate(data)

      console.log(login.isSuccess)

    } catch (error) {
      console.error(error);
    }
  }

  const session = login?.data || verifyToken?.data

  useEffect(()=>{
    console.log("consolelogin",login)
   },[login])


  return (
    <AuthContext.Provider value={{ user, signIn, session, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}