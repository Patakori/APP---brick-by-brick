import type { NextPage } from 'next'
import Error from 'next/error';
import { useEffect, useState } from 'react'
import { api } from '../service/api'

interface IProps {
  name:string;
  email:string;
}

const Home: NextPage = () => {

  //const [data, setData] = useState<IProps>({} as IProps)
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()



  const handleSubmit = async () => {
    try{
      api.post('/login', { email, password }).then(response => console.log(response.data) )
    }catch(e:any){ 
      alert("Esse e-mail já esta cadastrado")
    }
    
  }

  const handleShow = () => {
    api.get('/show').then(response => console.log(response.data) )
  }

  return (
   <div className='flex flex-col min-h-screen w-full gap-y-[10px] justify-center items-center'>
    <h1>Login</h1>
    <p>Email:</p>
    <input 
      type="text" 
      className='flex rounded-full w-[200px] h-[40px] px-[10px] bg-gray-400' 
      onChange={(e) => setEmail(e.target.value)}
    />
    <p>Senha:</p>
    <input 
      type="text" 
      className='flex rounded-full w-[200px] h-[40px] px-[10px] bg-gray-400' 
      onChange={(e) => setPassword(e.target.value)}
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
        handleShow
      }
     >Verficiar</button>
   </div>
  )
}

export default Home
