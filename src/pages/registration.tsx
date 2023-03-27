import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { api } from '../axios/axios'
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { SubmitNewUser } from '../querys/submitNewUser';
import { z } from 'zod';
import { Button } from '../components/Button';

const registerSchema = z.object({
  //name
  username:
  z.string({
    required_error: 'digite o nome do usuário'
  })
  .min(5, { message: 'minimo 5 letras'}),
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

type SchemaRegister = z.infer<typeof registerSchema>


export default function Registration (){

  const [register, setRegister] = useState<SchemaRegister>({} as SchemaRegister)
  const resultLogin = registerSchema.safeParse(register)

  const allErrors = {
    username: !resultLogin.success && resultLogin.error.formErrors.fieldErrors?.username?.[0],
    email: !resultLogin.success && resultLogin.error.formErrors.fieldErrors?.email?.[0],
    password: !resultLogin.success && resultLogin.error.formErrors.fieldErrors?.password?.[0]
  }

  const handleRegister = SubmitNewUser()


  return (
   <div 
    className='flex flex-col min-h-screen w-full gap-y-[10px] justify-center items-center
     bg-gray-800'
    >
    <Card
      title={'Cadastro'}
      width={'P'}
      align={'Center'}
      alignTitle={'Center'}
    >
      <Input 
        setOnChange={(e: any) => setRegister((prevState: any) => {
          console.log(e.target?.value);
          return ({ ...prevState, username: e.target?.value });
        })}
        title={'Nome'}
        error={allErrors.username}
        textValidation={'nome valido'}
        placeholder={'Digite o nome do usuário'}
        width={'G'}   
      />
      <Input 
        setOnChange={(e:any) => setRegister((prevState:any) => {
          console.log(e.target?.value)
          return ({...prevState, email: e.target?.value})
        })}
        title={'Email'}
        error={allErrors.email}
        textValidation={'email valido'}
        placeholder={'Digite o email do usuário'}
        width={'G'}
      />
      <Input 
        setOnChange={(e:any) => setRegister((prevState:any) => {
          console.log(e.target?.value)
          return ({...prevState, password: e.target?.value})
        })}
        title={'Senha'}
        error={allErrors.password}
        textValidation={'senha valida'}
        placeholder={'Digite a senha'}
        width={'G'}
      />
      <Button 
        onclickFunction={() => handleRegister.mutate(register)}
        text={'Enviar'}
        align={'Center'}
      />
    </Card>

   </div>
  )
}