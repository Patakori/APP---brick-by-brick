import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState } from 'react'
import {getAPIClient } from '../axios/axios'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { parseCookies } from 'nookies';
import { Header } from '../components/header';

const Home: NextPage = () => {

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const { signIn } = useContext(AuthContext)

  const handleSignIn = async (data: string | any) => {
    await signIn(data)
  }
  const { push } = useRouter()

  return (
   <div className='flex flex-col min-h-screen w-full gap-y-[10px] justify-center items-center'>
    <h1>Login</h1>
    <p>Email:</p>
    <input 
      type="text" 
      className='flex text-center rounded-full w-[200px] h-[40px] px-[10px] bg-gray-400' 
      onChange={(e) => setEmail(e.target.value)}
    />
    <p>Senha:</p>
    <input 
      type="text" 
      className='flex text-center rounded-full w-[200px] h-[40px] px-[10px] bg-gray-400' 
      onChange={(e) => setPassword(e.target.value)}
    />
    <button 
      className=' bg-orange-200 rounded-full w-[200px] h-[40px]'
      onClick={async () =>
        //handleSubmit
        await signIn({email, password})
      }
    >Entrar</button>
    <button
      className=' bg-orange-200 rounded-full w-[200px] h-[40px]'
      onClick={()=>push('http://localhost:3000/registration')}
     >Cadastrar</button>
   </div>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async (ctx:any) => {
  const apiClient = getAPIClient(ctx);
  const { ['auth.token']: token } = parseCookies(ctx)

  if(token){
    const validateToken = await apiClient.get('/recoveryUser',{
      headers: {
        'Authorization': `token ${token}`
      }
    }).then((response)=>{
      return response.data
    })
  
    if (validateToken) {
      return {
        redirect: {
          destination: '/profile',
          permanent: false,
        }
      }
    }
  }

  return {
    props: {}
  }
}
