/* eslint-disable no-undef */
import axios from 'axios'
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'

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
    const { data: countriesData } = await axios.get(
      'https://restcountries.com/v3.1/all',
      {
        transformResponse: [
          (data) => {
            const parsedData = JSON.parse(data)
            const countries = []

            for (let i = 0; i < 10; i++) {
              const country = {
                capital: parsedData[i]?.capital?.[0] || null,
                countryName: parsedData[i]?.name?.common,
                population: parsedData[i]?.population,
                region: parsedData[i]?.region,
                flags: {
                  png: parsedData[i]?.flags.png,
                  svg: parsedData[i]?.flags.svg,
                },
              }

              countries.push(country)
            }

            return countries
          },
        ],
      },
    )

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
