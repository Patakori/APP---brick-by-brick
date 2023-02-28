import type { GetServerSideProps } from 'next'
import Error from 'next/error';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { api } from '../axios/axios'
import { getAPIClient } from '../axios/axios';
import { GetAllUserQuery } from '../querys/getAllUser';
import { ChangeName } from '../querys/changeName';
import { UserServiceObject } from '../services/userServices';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { z } from 'zod';
import { Button } from '../components/Button';

const editSchema = z.object({
  //email
  name:
  z.string({
    required_error: 'digite o nome do usuário'
  })
})

type SchemaEdit = z.infer<typeof editSchema>

export default function EditProfile (){

  const [edit, setEdit] = useState<SchemaEdit>({} as SchemaEdit)
  const { session } = useContext(AuthContext)
  const queryClient = useQueryClient()
  const { push } = useRouter()
  const email = session?.email
  const name = edit?.name
  const users = GetAllUserQuery()
  const changeNewName = ChangeName()
  const resultEdit = editSchema.safeParse(edit)

  const allErrors = {
    name: !resultEdit.success && resultEdit.error.formErrors.fieldErrors?.name?.[0],
  }

  useEffect(()=>{
    console.log(edit)
  },[edit])

  // async function getUsers(){
  //  const response = await api.get('/show');
  //   return response.data;
  // }

  // const users = useQuery({
  //   queryKey: ["users"],
  //   queryFn: () => UserServiceObject.getAllUser().then((response)=>response),
  // })

  // console.log("users", users)



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
   <div className='flex flex-col min-h-screen w-full gap-y-[10px] justify-center items-center bg-slate-800'>
    <Card 
      title={'Editar perfil'}
    >
      <Input 
        setOnChange={(e: any) => setEdit((prevState: any) => {
          console.log(e.target?.value);
          return ({ ...prevState, name: e.target?.value });
        })}
        title={'Nome novo'}
        error={allErrors?.name}
        textValidation={'Nome valido'}
        placeholder={'Digite o novo nome'}
      />
      <Button 
        onclickFunction={() => changeNewName.mutate({name, email})}
        text={'Enviar'}
      />
      <Button 
        onclickFunction={() => deletedUser.mutate()}
        text={'Deletar Usuário'}
      />
    </Card>
    {/* <button 
      className=' bg-orange-200 rounded-full w-[200px] h-[40px]'
      onClick={
         () => changeNewName.mutate({email, name})
      }
    >Enviar</button> */}
    {/* <button
      className=' bg-orange-200 rounded-full w-[200px] h-[40px]'
      onClick={
    
        () => deletedUser.mutate()
      }
     >Deletar Usuário</button> */}
     <>
    {/* {
      users.data?.map((user:any)=>{
      return(
        <p
        key={user.id}
        >{user.name}</p>
      )
    })
    } */}
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
