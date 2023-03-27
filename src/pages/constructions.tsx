/* eslint-disable @next/next/no-img-element */
import { Fragment, useContext, useEffect } from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { AuthContext } from '../context/AuthContext'
import { api } from '../axios/axios'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../axios/axios'
import { useRouter } from 'next/router'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import Layout from '../components/Layout'


export default function Constructions() {
  const { session } = useContext(AuthContext)
  const { push } = useRouter()


  return (
    <div className='flex flex-col w-full gap-y-[10px] justify-center items-center bg-slate-800'>
      <Card 
        title={'Cadastrar Nova Obra'}
        width={'P'}
        align={'Center'}
        alignTitle={'Center'}
      >
        <Button 
          onclickFunction={() => push('/registerNewConstruction')}
          text={'Cadastrar'}
          align={'Center'}
        />
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

Constructions.getLayout = function getLayout(page:any) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};