import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import HeroSection from '../src/components/HeroSection';
import { api } from '../src/services/axios';

const Home: NextPage = ({
  countriesData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>Where in the world | Frontend Mentor</title>
      <link type="image/png" rel="icon" href="assets/favicon.png" />
    </Head>
    <HeroSection countriesData={countriesData!} />
  </>
);

export default Home;

export const getServerSideProps: GetServerSideProps<{
  countriesData?: CountryInformations[]
}> = async () => {
  try {
    const { data: countriesData } = await api.get('/getAllCountries');

    return {
      props: { countriesData },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {},
    };
  }
};
