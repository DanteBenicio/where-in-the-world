/* eslint-disable no-undef */
import React, {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '../../svgs/search-icon';

import { api } from '../../services/axios';
import { AppContext } from '../../context';
import { getCountriesFromSelectedRegion } from '../../utils/getCountriesFromSelectedRegion';

import CountryCard from '../CountryCard';

import { useClickOutside } from '../../hooks/useClickOutside';
import { useCanGetMoreCountries } from '../../hooks/useCanGetMoreCountries';

import styles from './styles.module.scss';

interface HeroSectionProps {
  countriesData: CountryInformations[]
}

export default function HeroSection({ countriesData }: HeroSectionProps) {
  const {
    themeMode, selectedRegion, setSelectedRegion, setWaitCursor,
  } = useContext(AppContext);

  const [showRegion, setShowRegion] = useState<boolean>(false);
  const [countries, setCountries] = useState<CountryInformations[]>(countriesData);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const inputFormRef = useRef<HTMLInputElement | null>(null);
  const regionListRef = useRef<HTMLUListElement | null>(null);
  const selectRegionRef = useRef<HTMLDivElement | null>(null);

  const { canGetMoreCountries } = useCanGetMoreCountries(countries);

  useClickOutside<HTMLDivElement>(() => {
    setShowRegion(false);
  }, selectRegionRef);

  useEffect(() => {
    (async () => {
      if (selectedRegion) {
        try {
          const { data } = await getCountriesFromSelectedRegion(selectedRegion);
          setCountries(data);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, []);

  function getAllCountries() {
    if (selectedRegion && selectedRegion !== 'All Countries') {
      try {
        (async () => {
          const { data: allCountriesData } = await api.get('/getAllCountries');

          setCountries(allCountriesData);
          setSelectedRegion('All Countries');
        })();
      } catch (error) {
        console.error(error);
      }
    }
  }

  const searchCountry = useCallback((input: HTMLInputElement) => {
    const inputValue = input?.value.toLowerCase();

    if (inputValue.length > 0) {
      (async () => {
        try {
          const { data: findedCountries } = await api.get('/getCountrySought', {
            params: {
              name: inputValue,
            },
          });

          setCountries(findedCountries);
        } catch (error) {
          console.error(error);
        }
      })();
    } else {
      (async () => {
        try {
          if (selectedRegion) {
            const { data } = await getCountriesFromSelectedRegion(
              selectedRegion,
            );

            setCountries(data);
          } else {
            const { data } = await api.get('/getAllCountries');
            setCountries(data);
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [selectedRegion]);

  function getSelectedRegion(event: React.MouseEvent<HTMLLIElement>) {
    const region = event.currentTarget;

    if (selectedRegion !== region.textContent) {
      (async () => {
        try {
          setWaitCursor(true);
          setShowRegion(false);
          const { data } = await getCountriesFromSelectedRegion(
            region.textContent!,
          );

          setSelectedRegion(region?.textContent!);
          setCountries(data);
          setWaitCursor(false);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }

  async function getMoreCountries() {
    if (canGetMoreCountries) {
      try {
        setIsFetching(true);

        const { data: newCountriesData } = await api.get('/getMoreCountries', {
          params: {
            countriesTotal: countries?.length,
            region: selectedRegion,
          },
        });

        if (inputFormRef.current?.value) {
          setCountries(newCountriesData);
          setIsFetching(false);
          return;
        }

        setCountries([...countries!, ...newCountriesData]);
        setIsFetching(false);
      } catch (error) {
        console.error(error);
      }
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
              e.preventDefault();
              searchCountry(inputFormRef.current!);
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
              ref={selectRegionRef}
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
                  <li onClick={getAllCountries}>All Countries</li>
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
            countries?.length! > 0 && canGetMoreCountries && (
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
  );
}
