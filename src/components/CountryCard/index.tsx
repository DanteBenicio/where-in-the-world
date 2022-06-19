/* eslint-disable no-undef */
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { AppContext } from '../../context'
import styles from './styles.module.scss'

type CountryCardProps = Pick<
  CountryInformations,
  'capital' | 'countryName' | 'flags' | 'population' | 'region'
>

export default function CountryCard({
  capital,
  countryName,
  flags,
  population,
  region,
}: CountryCardProps) {
  const { themeMode, setWaitCursor } = useContext(AppContext)

  return (
    <Link href={`/country/${countryName?.toLowerCase()}`}>
      <div
        onClick={() => setWaitCursor(true)}
        className={`${styles.card_container} ${
          themeMode === 'dark' ? styles.dark : ''
        }`}
        tabIndex={0}
      >
        <div className={styles.image_wrapper}>
          <Image
            src={flags?.svg}
            layout="fill"
            objectFit="cover"
            alt="country flag"
          />
        </div>
        <div className={styles.country_description}>
          <h2 id={styles.country_name}>{countryName}</h2>
          <p className={styles.text_description}>
            <span>Population: </span>
            {Intl.NumberFormat('en-US').format(population)}
          </p>
          <p className={styles.text_description}>
            <span>Region: </span>
            {region}
          </p>
          <p className={styles.text_description}>
            <span>Capital: </span>
            {capital}
          </p>
        </div>
      </div>
    </Link>
  )
}
