import '../src/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ContextProvider } from '../src/context';
import Header from '../src/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
