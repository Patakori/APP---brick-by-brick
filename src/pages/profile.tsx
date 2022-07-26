/* eslint-disable @next/next/no-img-element */
import { Fragment, useContext, useEffect } from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { AuthContext } from '../context/AuthContext'
import { api } from '../service/api'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../service/axios'


export default function Profile() {
  const { user } = useContext(AuthContext)
  console.log("userrrContext", user)

  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center text-black'>
     <p>{user?.name}</p> 
     <p>{user?.email}</p>
  

      
    
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx:any) => {
  const apiClient = getAPIClient(ctx);
  const { ['auth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}