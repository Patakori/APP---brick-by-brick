/* eslint-disable @next/next/no-img-element */
import { Fragment, useContext, useEffect } from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { AuthContext } from '../context/AuthContext'
import { api } from '../service/axios'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../service/axios'
import { useRouter } from 'next/router'


export default function Profile() {
  const { user } = useContext(AuthContext)
  const { push } = useRouter()

  // useEffect(() => {
  //   api.get('/show');
  // }, [])

  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center text-black'>
     <p>{user?.name}</p> 
     <p>{user?.email}</p>
   
     <button
      className=' bg-orange-200 rounded-full w-[200px] h-[40px]'
      onClick={()=>push('http://localhost:3000/editProfile')}
     >Editar</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx:any) => {
  const apiClient = getAPIClient(ctx);
  const { ['auth.token']: token } = parseCookies(ctx)

  console.log("token", token)

  const validateToken = await apiClient.get('/validateToken',{
    headers: {
      'Authorization': `token ${token}`
    }
  }).catch((error)=>{
    console.log(error?.response?.status)
  })

  console.log("validateToken", validateToken?.status)

  if (!token || !validateToken) {
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