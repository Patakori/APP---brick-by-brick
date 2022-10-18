import type { NextPage } from 'next'
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { api } from '../service/axios'

interface IProps {
  name:string;
  email:string;
}

export default function Registration (){

  //const [data, setData] = useState<IProps>({} as IProps)
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const{ push } = useRouter()

  const handleSubmit = async () => {
    try{
      await api.post('/account', {
        name,
        email,
        password
      }).then(()=>push('/'))
    }catch(e:any){ 
      alert("Esse e-mail já esta cadastrado")
    }
    
  }


  return (
   <div className='flex flex-col min-h-screen w-full gap-y-[10px] justify-center items-center'>
    <h1>Cadastro</h1>
    <p>Nome:</p>
    <input 
      type="text" 
      className='flex text-center rounded-full w-[200px] h-[40px] px-[10px] bg-gray-400' 
      onChange={(e) => setName(e.target.value)}
    />
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
      onClick={
        handleSubmit
      }
    >Enviar</button>
   </div>
  )
}