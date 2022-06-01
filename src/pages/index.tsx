import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Where in the world | Frontend Mentor</title>
        <link type="image/png" rel="icon" href="assets/favicon.png" />
      </Head>
      <Header />
      <HeroSection />
    </>
  )
}

export default Home
