/* eslint-disable no-undef */
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React, { useContext } from 'react'
import { AppContext } from '../../context'
import { api, countriesRequest } from '../../services/axios'
import styles from './styles.module.scss'
import ArrowBack from '../../svgs/arrow-back'
import Link from 'next/link'

interface CountryProps {
  countryData: CountryInformations
}

export default function Country({ countryData }: CountryProps) {
  const { themeMode } = useContext(AppContext)

  return (
    <section
      className={`${styles.section_container} ${
        themeMode === 'dark' ? styles.dark : ''
      }`}
    >
      <div className={styles.section_wrapper}>
        <div className={styles.back_button_wrapper}>
          <Link href="/">
            <button className={`${themeMode === 'dark' ? styles.dark : ''}`}>
              {themeMode === 'dark' ? (
                <ArrowBack fillColor="#FFF" />
              ) : (
                <ArrowBack fillColor="#000" />
              )}
              Back
            </button>
          </Link>
        </div>

        <div className={styles.content_wrapper}>
          <div className={styles.image_wrapper}>
            <Image
              src={countryData?.flags?.svg}
              layout="fill"
              objectFit="cover"
              alt="country flag"
            />
          </div>

          <div className={styles.country_info_container}>
            <h2>{countryData.countryName}</h2>

            <div className={styles.country_info_wrapper}>
              <div className={styles.country_info}>
                <p>
                  <span>Native Name:</span>{' '}
                  {
                    countryData?.nativeName?.[
                      Object.keys(countryData?.nativeName)[0]
                    ]?.common
                  }
                </p>
                <p>
                  <span>Population:</span>{' '}
                  {new Intl.NumberFormat('en-US').format(
                    countryData?.population,
                  )}
                </p>
                <p>
                  <span>Region:</span> {countryData?.region}
                </p>
                <p>
                  <span>Sub Region:</span> {countryData?.sub_region}
                </p>
                <p>
                  <span>Capital:</span> {countryData?.capital}
                </p>
              </div>

              <div className={styles.country_info}>
                <p>
                  <span>Top Level Domain:</span>{' '}
                  {countryData?.top_level_domain.map((tld) => ` ${tld}`)}
                </p>
                <p>
                  <span>Currencies:</span>{' '}
                  {Object.entries(countryData?.currencies).map(
                    ([_, value]) => value.name,
                  )}
                </p>
                <p>
                  <span>Languages:</span>{' '}
                  {Object.entries(countryData.languages).map(
                    ([_, value]) => ` ${value}`,
                  )}
                </p>
              </div>
            </div>

            <div className={styles.border_countries_wrapper}>
              <p>Border Countries: </p>
              {countryData?.borders.map((border) => (
                <span
                  key={border}
                  className={`${styles.border_country} ${
                    themeMode === 'dark' ? styles.dark : ''
                  }`}
                >
                  {border}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: newCountriesData } = await countriesRequest.get('/all')

  const paths = newCountriesData.map((country: any) => ({
    params: {
      name: country.name?.common.toLowerCase(),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params!

  console.log(name)

  const { data: countryData } = await api.get('/getCountry', {
    params: {
      name,
    },
  })

  return {
    props: {
      countryData,
    },
  }
}
