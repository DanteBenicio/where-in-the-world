/* eslint-disable no-undef */
import React, { useContext, useRef, useState } from 'react'
import CountryCard from '../CountryCard'
import styles from './styles.module.scss'
import SearchIcon from '../../svgs/search-icon'
import { AppContext } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { api } from '../../services/axios'
import { AxiosPromise } from 'axios'

interface HeroSectionProps {
  countriesData: CountryInformations[]
}

export default function HeroSection({ countriesData }: HeroSectionProps) {
  const { themeMode } = useContext(AppContext)
  const [showRegion, setShowRegion] = useState<boolean>(false)
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [countries, setCountries] =
    useState<CountryInformations[]>(countriesData)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const inputFormRef = useRef<HTMLInputElement | null>(null)
  const regionListRef = useRef<HTMLUListElement | null>(null)
  const selectRegionRef = useRef<HTMLDivElement | null>(null)

  function getSelectedRegion(event: React.MouseEvent<HTMLLIElement>) {
    const region = event.currentTarget

    ;(async () => {
      try {
        const { data } = await getCountriesFromSelectedRegion(
          region.textContent!,
        )

        setSelectedRegion(region?.textContent!)
        setShowRegion(false)
        setCountries(data)
      } catch (error) {
        console.error(error)
      }
    })()
  }

  async function getCountriesFromSelectedRegion(
    region: string,
  ): Promise<AxiosPromise<CountryInformations[]>> {
    try {
      return await api.get<CountryInformations[]>('/getCountries', {
        params: {
          region,
        },
      })
    } catch (error) {
      console.error(error)

      return error as any
    }
  }

  async function getMoreCountries() {
    try {
      setIsFetching(true)

      const { data: newCountriesData } = await api.get('/getMoreCountries', {
        params: {
          countriesTotal: countries?.length,
          region: selectedRegion,
        },
      })

      if (inputFormRef.current?.value) {
        setCountries(newCountriesData)
        setIsFetching(false)
        return
      }

      setCountries([...countries!, ...newCountriesData])
      setIsFetching(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className={styles.section_container}>
      <main
        className={`${styles.main_wrapper} ${
          themeMode === 'dark' ? styles.dark : ''
        }`}
      >
        <div className={styles.top_container}>
          <form
            className={`${styles.form} ${
              themeMode === 'dark' ? styles.dark : ''
            }`}
            onSubmit={(e) => {
              e.preventDefault()
              searchCountry(inputFormRef.current!)
            }}
            onClick={() => inputFormRef.current?.focus()}
          >
            {themeMode === 'dark' ? (
              <SearchIcon fillColor="#FFFFFF" size={24} />
            ) : (
              <SearchIcon size={24} />
            )}
            <input
              type="text"
              placeholder="Search for a country..."
              onChange={(e) => searchCountry(e.currentTarget)}
              ref={inputFormRef}
            />
          </form>

          <div className={styles.select_region_container}>
            <div
              onClick={() => setShowRegion(!showRegion)}
              className={`${styles.select_region} ${
                themeMode === 'dark' ? styles.dark : ''
              }`}
            >
              <span>{selectedRegion || 'Filter by Region'}</span>
              {themeMode === 'light' ? (
                <FontAwesomeIcon
                  color="#000"
                  icon={faChevronDown}
                  size="sm"
                  className={`${styles.chevron} ${
                    showRegion ? styles.active : ''
                  }`}
                />
              ) : (
                <FontAwesomeIcon
                  color="#FFF"
                  icon={faChevronDown}
                  size="sm"
                  className={`${styles.chevron} ${
                    showRegion ? styles.active : ''
                  }`}
                />
              )}
            </div>
            {showRegion && (
              <div
                className={`${styles.region_list_wrapper} ${
                  themeMode === 'dark' ? styles.dark : ''
                }`}
              >
                <ul className={styles.region_list} ref={regionListRef}>
                  <li onClick={getSelectedRegion}>Africa</li>
                  <li onClick={getSelectedRegion}>Americas</li>
                  <li onClick={getSelectedRegion}>Asia</li>
                  <li onClick={getSelectedRegion}>Europe</li>
                  <li onClick={getSelectedRegion}>Oceania</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {countries?.length === 0 ? (
          <div className={styles.load_wrapper}>
            <div
              className={`${styles.loading} ${
                themeMode === 'dark' ? styles.dark : ''
              }`}
            />
          </div>
        ) : (
          <div className={styles.cards_container}>
            {countries?.map((country) => (
              <CountryCard
                key={country.capital}
                capital={country.capital}
                countryName={country.countryName}
                flags={country.flags}
                population={country.population}
                region={country.region}
              />
            ))}
          </div>
        )}

        <div className={styles.load_more_btn_wrapper}>
          {isFetching ? (
            <div
              className={`${styles.loading} ${
                themeMode === 'dark' ? styles.dark : ''
              }`}
            />
          ) : (
            countries?.length! > 0 && (
              <button
                type="button"
                onClick={getMoreCountries}
                className={`${styles.load_more_btn} ${
                  themeMode === 'dark' ? styles.dark : ''
                }`}
              >
                Load More
              </button>
            )
          )}
        </div>
      </main>
    </section>
  )
}
