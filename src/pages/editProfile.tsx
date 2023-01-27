import type { GetServerSideProps } from 'next'
import Error from 'next/error';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { api } from '../axios/axios'
import { getAPIClient } from '../axios/axios';
import { GetAllUserQuery } from '../querys/getAllUser';
import { ChangeName } from '../querys/changeName';
import { UserServiceObject } from '../services/userServices';

export default function EditProfile (){

  const [newName, setNewName] = useState<string>("")
  const { session } = useContext(AuthContext)

  const queryClient = useQueryClient()

  const { push } = useRouter()

  // async function getUsers(){
  //  const response = await api.get('/show');
  //   return response.data;
  // }

  // const users = useQuery({
  //   queryKey: ["users"],
  //   queryFn: () => UserServiceObject.getAllUser().then((response)=>response),
  // })

  // console.log("users", users)
  const email = session?.email
  const name = newName
  const users = GetAllUserQuery()

  // async function changeName(data:any){
  //   const response = await api.put(`/account/${data.email}`, {
  //    name : data.name
  //  })
  //    return response.data;
  //  }

  //   const changeNewName = useMutation({
  //     mutationKey: ["users"],
  //     mutationFn: (data:any) => changeName(data),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["users"])    
  //     },
  //   })

    const changeNewName = ChangeName()

  async function handleDelete(){
    await api.delete(`/delete/${session?.email}`).then(response => response )
    destroyCookie(undefined, "auth.token")
    push("/")
  }

  const deletedUser = useMutation({
    mutationKey: ["user"],
    mutationFn: handleDelete,
  })

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
         () => changeNewName.mutate({email, name})
      }
    >Enviar</button>
    <button
      className=' bg-orange-200 rounded-full w-[200px] h-[40px]'
      onClick={
    
        () => deletedUser.mutate()
      }
     >Deletar Usuário</button>
     <>
    {
      users.data?.map((user:any)=>{
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
