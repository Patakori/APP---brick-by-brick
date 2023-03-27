
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { AuthProvider } from '../context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: any) {
  const queryClient = new QueryClient()
  const getLayout = Component.getLayout || ((page:any) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  )
}

export default MyApp

