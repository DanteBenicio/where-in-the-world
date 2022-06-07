import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ContextProvider } from '../context'
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Header />
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
