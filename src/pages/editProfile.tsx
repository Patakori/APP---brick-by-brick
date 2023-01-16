import type { GetServerSideProps, NextPage } from 'next'
import Error from 'next/error';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useMutation, useQueryClient } from 'react-query/react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../service/axios'
import { getAPIClient } from '../service/axios';

interface IProps {
  name:string;
  email:string;
}

export default function EditProfile (){

  //const [data, setData] = useState<IProps>({} as IProps)
  const [newName, setNewName] = useState<string>()
  const { user } = useContext(AuthContext)

  const queryClient = useQueryClient()

  const { push } = useRouter()
  const key = ["user"]
  const {data} = useQuery<IProps[]>(key, () => api.get('/show').then(response => response.data))

  const handleSubmit = async () => {
    console.log("newName", user?.email)
    try{
      await api.put(`/account/${user?.email}`, {
        name : newName
      })
    }catch(e:any){ 
      alert("Algo deu errado")
    }    
  }

  const { mutate } = useMutation(
      () => api.put(`/account/${user?.email}`, {
        name : newName
      }),{
        onSuccess:()=>{
          queryClient.invalidateQueries("user")
        }
      }

    )

  // const testeGet = async () => {
  //   try{
  //     await api.get('/user').then(response => response.data)
  //   }catch(e:any){ 
  //     alert("Algo deu errado")
  //   }    
  // }

  const handleDelete = async () => {
    await api.delete('/account/di@di').then(response => response.data )
    await push("/")
  }

  return (
   <div className='flex flex-col min-h-screen w-full gap-y-[10px] justify-center items-center'>
    <h1>Editar Perfil</h1>
    <p>Nome Novo:</p>
    <input 
      type="text" 
      className='flex text-center rounded-full w-[200px] h-[40px] px-[10px] bg-gray-400' 
      onChange={(e) => setNewName(e.target.value)}
    />
    <button 
      className=' bg-orange-200 rounded-full w-[200px] h-[40px]'
      onClick={
        // handleSubmit
        () => mutate()
      }
    >Enviar</button>
    <button
      className=' bg-orange-200 rounded-full w-[200px] h-[40px]'
      onClick={
        handleDelete
      }
     >Deletar Usuário</button>
     <>
    {
      data?.map((user:any)=>{
      return(
        <p
        key={user.id}
        >{user.name}</p>
      )
    })
    }
</>
   </div>
   
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['auth.token']: token } = parseCookies(ctx)

  console.log("token", token)

  const validateToken = await api.get('/validateToken',{
    headers: {
      'Authorization': `token ${token}`
    }
  }).catch((error)=>{
    console.log(error.response?.status)
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

  // 

  return {
    props: {}
  }
}
