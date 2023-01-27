import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { api } from '../axios/axios'
import { SubmitNewUser } from '../querys/submitNewUser';


export default function Registration (){

  const [username, setUserName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  // const{ push } = useRouter()



  // async function handleSubmit(){
  //   const response = await api.post('/account', {
  //     username,
  //     email,
  //     password
  //   }).then(()=>push('/'))
  //    return response;
  //  }

  //  const queryClient = useQueryClient()

  //   const register = useMutation({
  //     mutationFn: handleSubmit,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["session"])    
  //     },
  //   })

  const register = SubmitNewUser()


  return (
   <div className='flex flex-col min-h-screen w-full gap-y-[10px] justify-center items-center'>
    <h1>Cadastro</h1>
    <p>Nome:</p>
    <input 
      type="text" 
      className='flex text-center rounded-full w-[200px] h-[40px] px-[10px] bg-gray-400' 
      onChange={(e) => setUserName(e.target.value)}
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
       () => register.mutate({username, email, password})
      }
    >Enviar</button>
   </div>
  )
}