import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react'
import {getAPIClient } from '../axios/axios'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { parseCookies } from 'nookies';
import { ButtonTeste } from '../components/ButtonTeste';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { z } from 'zod';

const loginSchema = z.object({
  //email
  email:
  z.string({
    required_error: 'digite o email do usuário'
  })
  .email({ message: 'email invalido'})
  .min(5, { message: 'minimo 5 letras'}),

  //password
  password: z.string({
    required_error: "digite a senha"
  })
  .min(5, { message: 'minimo 5 digitos'}),
})

type SchemaLogin = z.infer<typeof loginSchema>

const Home: NextPage = () => {

  const [login, setLogin] = useState<SchemaLogin>({} as SchemaLogin)
  const resultLogin = loginSchema.safeParse(login)
  const { signIn } = useContext(AuthContext)

  const allErrors = {
    email: !resultLogin.success && resultLogin.error.formErrors.fieldErrors?.email?.[0],
    password: !resultLogin.success && resultLogin.error.formErrors.fieldErrors?.password?.[0]
  }

  const { push } = useRouter()

  return (
   <div className='flex flex-col min-h-screen w-full gap-y-[10px] justify-center items-center bg-slate-800'>
    <Card 
      title={'Login'}
    >
      <Input 
        setOnChange={(e: any) => setLogin((prevState: any) => {
          console.log(e.target?.value);
          return ({ ...prevState, email: e.target?.value });
        })}
        title={'Email:'}
        error={allErrors?.email} 
        textValidation={'email valido'}
      />
      <Input 
        setOnChange={(e:any) => setLogin((prevState:any) => {
          console.log(e.target?.value)
          return ({...prevState, password: e.target?.value})
        })}
        title={'Senha:'}
        error={allErrors?.password}
        textValidation={'senha valida'}
      />
      <Button 
      onclickFunction={() => {
        console.log(login)
        signIn(login)
      }} 
      text={'Entrar'} />
      <Button onclickFunction={() => push('/registration')} text={'Cadastrar'} />
    </Card>
   </div>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async (ctx:any) => {
  const apiClient = getAPIClient(ctx);
  const { ['auth.token']: token } = parseCookies(ctx)

  // if(token){
  //   const validateToken = await apiClient.get('/recoveryUser',{
  //     headers: {
  //       'Authorization': `token ${token}`
  //     }
  //   }).then((response)=>{
  //     return response.data
  //   })
  
  //   if (validateToken) {
  //     return {
  //       redirect: {
  //         destination: '/profile',
  //         permanent: false,
  //       }
  //     }
  //   }
  // }

  return {
    props: {}
  }
}
