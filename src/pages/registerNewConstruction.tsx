/* eslint-disable @next/next/no-img-element */
import { Fragment, useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { AuthContext } from '../context/AuthContext'
import { api } from '../axios/axios'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../axios/axios'
import { useRouter } from 'next/router'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import Layout from '../components/Layout'
import { Input } from '../components/Input'
import { z } from 'zod'

const registerConstructionSchema = z.object({
  nameBuilding:z.string({required_error: 'digite o nome da obra'}).min(5, { message: 'minimo 5 letras'}),
  buildingAddress:z.string({required_error: 'digite o endereço'}).min(5, { message: 'minimo 5 letras'}),
  constructionCompanyName:z.string({required_error: 'digite o nome da construtora'}).min(5, { message: 'minimo 5 letras'}),
  constructionCompanyResponsible:z.string({required_error: 'digite o nome do responsável'}).min(5, { message: 'minimo 5 letras'}),
  constructionCompanyCNPJ:z.string({required_error: 'digite o CNPJ'}).min(5, { message: 'minimo 5 letras'}),
  constructionCompanyTel:z.string({required_error: 'digite o telefone'}).min(5, { message: 'minimo 5 letras'}),
  managementName:z.string({required_error: 'digite o nome da gerenciadora'}).min(5, { message: 'minimo 5 letras'}),
  managementResponsible:z.string({required_error: 'digite o nome do responsável'}).min(5, { message: 'minimo 5 letras'}),
  managementCNPJ:z.string({required_error: 'digite o CNPJ'}).min(5, { message: 'minimo 5 letras'}),
  managementTel:z.string({required_error: 'digite o telefone'}).min(5, { message: 'minimo 5 letras'}),
  clientName:z.string({required_error: 'digite o nome do cliente'}).min(5, { message: 'minimo 5 letras'}),
  clientResponsible:z.string({required_error: 'digite o nome do responsável'}).min(5, { message: 'minimo 5 letras'}),
  clientCNPJ:z.string({required_error: 'digite o CNPJ'}).min(5, { message: 'minimo 5 letras'}),
  clientTel:z.string({required_error: 'digite o telefone'}).min(5, { message: 'minimo 5 letras'}),
})

type SchemaLogin = z.infer<typeof registerConstructionSchema>


export default function RegisterNewConstruction() {
  const [registerConstruction, setRegisterConstruction] = useState<SchemaLogin>({} as SchemaLogin)
  const resultCosntruction = registerConstructionSchema.safeParse(registerConstruction)
  const { session } = useContext(AuthContext)
  const { push } = useRouter()

  const allErrors = {
    nameBuilding: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.nameBuilding?.[0],
    buildingAddress: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.buildingAddress?.[0],
    constructionCompanyName: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.constructionCompanyName?.[0],
    constructionCompanyResponsible: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.constructionCompanyResponsible?.[0],
    constructionCompanyCNPJ: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.constructionCompanyCNPJ?.[0],
    constructionCompanyTel: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.constructionCompanyTel?.[0],
    managementName: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.managementName?.[0],
    managementResponsible: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.managementResponsible?.[0],
    managementCNPJ: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.managementCNPJ?.[0],
    managementTel: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.managementTel?.[0],
    clientName: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.clientName?.[0],
    clientResponsible: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.clientResponsible?.[0],
    clientCNPJ: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.clientCNPJ?.[0],
    clientTel: !resultCosntruction.success && resultCosntruction.error.formErrors.fieldErrors?.clientTel?.[0],
  }

  function submitRegisterConstruction(){
    console.log(Object.keys(allErrors).length)
    if(Object.keys(allErrors).length === 0){
      console.log("post")
    }
  }


  return (
    <div className='flex flex-col w-full h-full gap-y-[10px] justify-start px-4 py-4 items-center'>
      <Card
        title={'Nova Obra'}
        width={'G'}
        align={'Start'}
        alignTitle={'Center'}
      >
        <Card 
          title={'Obra'}
          width={'G'}
          align={'Start'}
          alignTitle={'Start'}
        >
          <Input 
            setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
              console.log(e.target?.value);
              return ({ ...prevState, nameBuilding: e.target?.value });
            })}
            title={'Nome:'}
            error={allErrors?.nameBuilding}
            textValidation={'valido'}
            placeholder={'Nome da obra'}
            width={'G'}
          />
          <Input 
            setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
              console.log(e.target?.value);
              return ({ ...prevState, buildingAddress: e.target?.value });
            })}
            title={'Endereço:'}
            error={allErrors?.buildingAddress}
            textValidation={'valido'}
            placeholder={'Endereço da obra'}
            width={'G'}
          />
        </Card>

        {/* Construtora */}
        <Card 
          title={'Construtora'}
          width={'G'}
          align={'Start'}
          alignTitle={'Start'}
        >
          <div className='flex gap-4 w-full h-auto'>
            <div className='flex flex-col w-full gap-2'>
              <Input 
                setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
                  console.log(e.target?.value);
                  return ({ ...prevState, constructionCompanyName: e.target?.value });
                })}
                title={'Nome:'}
                error={allErrors?.constructionCompanyName}
                textValidation={'valido'}
                placeholder={'Nome da construtora'}
                width={'G'}
              />
              <Input 
                setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
                  console.log(e.target?.value);
                  return ({ ...prevState, constructionCompanyResponsible: e.target?.value });
                })}
                title={'Responsável:'}
                error={allErrors?.constructionCompanyResponsible}
                textValidation={'valido'}
                placeholder={'Nome do responsável'}
                width={'G'}
              />
            </div>
            <div className='flex gap-2 flex-col w-full'>
              <Input 
                setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
                  console.log(e.target?.value);
                  return ({ ...prevState, constructionCompanyCNPJ: e.target?.value });
                })}
                title={'CNPJ:'}
                error={allErrors?.constructionCompanyCNPJ}
                textValidation={'valido'}
                placeholder={'CNPJ da construtora'}
                width={'G'}
              />
              <Input 
                setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
                  console.log(e.target?.value);
                  return ({ ...prevState, constructionCompanyTel: e.target?.value });
                })}
                title={'Tel:'}
                error={allErrors?.constructionCompanyTel}
                textValidation={'valido'}
                placeholder={'Tel do responsável'}
                width={'G'}
              />
            </div>
          </div>
        </Card>

        {/* Gerenciadora */}
        <Card 
          title={'Gerenciadora'}
          width={'G'}
          align={'Start'}
          alignTitle={'Start'}
        >
          <div className='flex gap-4 w-full'>
            <div className='flex flex-col w-full gap-2'>
              <Input 
                setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
                  console.log(e.target?.value);
                  return ({ ...prevState, managementName: e.target?.value });
                })}
                title={'Nome:'}
                error={allErrors?.managementName}
                textValidation={'valido'}
                placeholder={'Nome da gerenciadora'}
                width={'G'}
              />
              <Input 
                setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
                  console.log(e.target?.value);
                  return ({ ...prevState, managementResponsible: e.target?.value });
                })}
                title={'Responsável:'}
                error={allErrors?.managementResponsible}
                textValidation={'valido'}
                placeholder={'Nome do responsável'}
                width={'G'}
              />
            </div>
            <div className='flex flex-col w-full gap-2'>
              <Input 
                setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
                  console.log(e.target?.value);
                  return ({ ...prevState, managementCNPJ: e.target?.value });
                })}
                title={'CNPJ:'}
                error={allErrors?.managementCNPJ}
                textValidation={'valido'}
                placeholder={'CNPJ da gerenciadora'}
                width={'G'}
              />
              <Input 
                setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
                  console.log(e.target?.value);
                  return ({ ...prevState, managementTel: e.target?.value });
                })}
                title={'Tel:'}
                error={allErrors?.managementTel}
                textValidation={'valido'}
                placeholder={'Tel do responsável'}
                width={'G'}
              />
            </div>
          </div>
        </Card>

        {/* Cliente */}
        <Card 
          title={'Cliente'}
          width={'G'}
          align={'Start'}
          alignTitle={'Start'}
        >
          <div className='flex gap-4 w-full'>
            <div className='flex flex-col w-full gap-2'>
              <Input 
                setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
                  console.log(e.target?.value);
                  return ({ ...prevState, clientName: e.target?.value });
                })}
                title={'Nome:'}
                error={allErrors?.clientName}
                textValidation={'valido'}
                placeholder={'Nome do cliente'}
                width={'G'}
              />
              <Input 
                setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
                  console.log(e.target?.value);
                  return ({ ...prevState, clientResponsible: e.target?.value });
                })}
                title={'Responsável:'}
                error={allErrors?.clientResponsible}
                textValidation={'valido'}
                placeholder={'Nome do responsável'}
                width={'G'}
              />
            </div>
            <div className='flex flex-col w-full gap-2'>
              <Input 
                setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
                  console.log(e.target?.value);
                  return ({ ...prevState, clientCNPJ: e.target?.value });
                })}
                title={'CNPJ:'}
                error={allErrors?.clientCNPJ}
                textValidation={'valido'}
                placeholder={'CNPJ do cliente'}
                width={'G'}
              />
              <Input 
                setOnChange={(e: any) => setRegisterConstruction((prevState: any) => {
                  console.log(e.target?.value);
                  return ({ ...prevState, clientTel: e.target?.value });
                })}
                title={'Tel:'}
                error={allErrors?.clientTel}
                textValidation={'valido'}
                placeholder={'Tel do responsável'}
                width={'G'}
              />
            </div>
          </div>
        </Card>
        <div className='mt-5 w-full flex justify-center items-center'>
          <Button 
            onclickFunction={()=>{
              submitRegisterConstruction()
            }}
            text={'Cadastrar'}
            align={'Center'}
          />
        </div>
      </Card>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx:any) => {
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

RegisterNewConstruction.getLayout = function getLayout(page:any) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};