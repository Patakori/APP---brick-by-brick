import type { NextPage } from 'next'
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { api } from '../service/api'

interface IProps {
  name:string;
  email:string;
}

export default function EditProfile (){

  //const [data, setData] = useState<IProps>({} as IProps)
  const [newName, setNewName] = useState<string>()

  const { push } = useRouter()

  const handleSubmit = async () => {
    try{
      await api.put('/account/di@di', {
        name : newName
      })
    }catch(e:any){ 
      alert("Algo deu errado")
    }    
  }

  const handleDelete = async () => {
    await api.delete('/account/di@di').then(response => console.log(response.data) )
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
        handleSubmit
      }
    >Enviar</button>
    <button
      className=' bg-orange-200 rounded-full w-[200px] h-[40px]'
      onClick={
        handleDelete
      }
     >Deletar Usuário</button>
   </div>
  )
}
