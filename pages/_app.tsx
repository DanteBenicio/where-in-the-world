import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ContextProvider } from '../src/context'
import Header from '../src/components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Header />
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
