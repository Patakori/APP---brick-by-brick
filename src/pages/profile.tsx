/* eslint-disable @next/next/no-img-element */
import { Fragment, useContext, useEffect } from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { AuthContext } from '../context/AuthContext'
import { api } from '../axios/axios'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../axios/axios'
import { useRouter } from 'next/router'


export default function Profile() {
  const { session } = useContext(AuthContext)
  const { push } = useRouter()


  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center text-black'>
     <p>{session?.name}</p> 
     <p>{session?.email}</p>
   
     <button
      className=' bg-orange-200 rounded-full w-[200px] h-[40px]'
      onClick={()=>push('/editProfile')}
     >Editar</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx:any) => {
  const apiClient = getAPIClient(ctx);
  const { ['auth.token']: token } = parseCookies(ctx)

  const validateToken = await apiClient.get('/recoveryUser',{
    headers: {
      'Authorization': `token ${token}`
    }
  }).then((response)=>{
    return response
  })

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