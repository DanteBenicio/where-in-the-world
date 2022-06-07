/* eslint-disable no-undef */
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context'
import { api, countriesRequest } from '../../services/axios'
import styles from './styles.module.scss'
import ArrowBack from '../../svgs/arrow-back'
import Link from 'next/link'

interface CountryProps {
  countryData: CountryInformations
}

export default function Country({ countryData }: CountryProps) {
  const { themeMode, setWaitCursor } = useContext(AppContext)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(false)
    setWaitCursor(false)
  }, [])

  return (
    <section
      className={`${styles.section_container} ${
        themeMode === 'dark' ? styles.dark : ''
      }`}
    >
      <div className={styles.section_wrapper}>
        <div className={styles.back_button_wrapper}>
          <Link href="/" prefetch>
            <button
              onClick={() => setLoading(true)}
              className={`${themeMode === 'dark' ? styles.dark : ''}`}
            >
              {!loading ? (
                <>
                  {themeMode === 'dark' ? (
                    <ArrowBack fillColor="#FFF" />
                  ) : (
                    <ArrowBack fillColor="#000" />
                  )}
                  Back
                </>
              ) : (
                <div className={styles.loading} />
              )}
            </button>
          </Link>
        </div>

        <div className={styles.content_wrapper}>
          <Image
            className={styles.image}
            src={countryData?.flags?.svg}
            objectFit="cover"
            width={500}
            height={400}
            alt="country flag"
          />

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
                  <span>Region:</span>{' '}
                  {countryData?.region || <strong>Without region</strong>}
                </p>
                <p>
                  <span>Sub Region:</span>{' '}
                  {countryData?.sub_region || (
                    <strong>Without sub region</strong>
                  )}
                </p>
                <p>
                  <span>Capital:</span>{' '}
                  {countryData?.capital || <strong>Without capital</strong>}
                </p>
              </div>

              <div className={styles.country_info}>
                <p>
                  <span>Top Level Domain:</span>{' '}
                  {countryData?.top_level_domain.map((tld) => ` ${tld}`)}
                </p>
                <p>
                  <span>Currencies:</span>{' '}
                  {countryData?.currencies ? (
                    Object.entries(countryData?.currencies).map(
                      ([_, value]) => value.name,
                    )
                  ) : (
                    <strong>Without currencies</strong>
                  )}
                </p>
                <p>
                  <span>Languages:</span>{' '}
                  {countryData.languages ? (
                    Object.entries(countryData.languages).map(
                      ([_, value]) => ` ${value}`,
                    )
                  ) : (
                    <strong>Without languages</strong>
                  )}
                </p>
              </div>
            </div>

            <div className={styles.border_countries_wrapper}>
              <p>Border Countries: </p>
              {countryData?.borders ? (
                countryData.borders.map((border) => (
                  <span
                    key={border}
                    className={`${styles.border_country} ${
                      themeMode === 'dark' ? styles.dark : ''
                    }`}
                  >
                    {border}
                  </span>
                ))
              ) : (
                <strong>This country does not border any country</strong>
              )}
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
