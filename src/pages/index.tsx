import type { NextPage } from 'next'
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { api } from '../service/api-old'
import Cookies from 'js-cookie'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface IProps {
  name:string;
  email:string;
}

const Home: NextPage = () => {

  //const [data, setData] = useState<IProps>({} as IProps)
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [logged, setLogged] = useState<string>("")

  const { signIn } = useContext(AuthContext)

  const handleSignIn = async (data: string | any) => {
    await signIn(data)
  }

  const { push }= useRouter()

  // const handleSubmit = async () => {
  //   try{
  //     await api.post('/login', { email, password }).then(()=>setLogged('true')).then(async()=>await Cookies.set("logged", "true"))
  //     await push('http://localhost:3000/editProfile')
  //   }catch(e:any){ 
  //     setLogged('false')
  //     Cookies.set("logged", "false")
  //   }
    
  // }

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
      onClick={() =>
        //handleSubmit
        handleSignIn({email, password})
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
