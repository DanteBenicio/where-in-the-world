/* eslint-disable no-undef */
import axios from 'axios'
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Head from 'next/head'
import HeroSection from '../components/HeroSection'
import { api } from '../services/axios'

const Home: NextPage = ({
  countriesData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Where in the world | Frontend Mentor</title>
        <link type="image/png" rel="icon" href="assets/favicon.png" />
      </Head>
      <HeroSection countriesData={countriesData!} />
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<{
  countriesData?: CountryInformations[]
}> = async () => {
  try {
    const { data: countriesData } = await api.get('/getAllCountries')

    return {
      props: { countriesData },
    }
  } catch (error) {
    console.log(error)

    return {
      props: {},
    }
  }
}
