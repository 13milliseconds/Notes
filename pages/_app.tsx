import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Header/Header'
import { DataProvider } from '@/lib/context'


export default function App({ Component, pageProps }: AppProps) {
  return <>
  <DataProvider>
  <Header />
  <Component {...pageProps} />
  </DataProvider>
  </>
}
