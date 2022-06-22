/* eslint-disable no-undef */
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import {ALL_AFRICA_COUNTRIES, ALL_AMERICAS_COUNTRIES, ALL_ASIA_COUNTRIES, ALL_EUROPE_COUNTRIES, ALL_OCEANIA_COUNTRIES} from '../../src/constants/countries-length'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CountryInformations | unknown>,
) => {
  const { countriesTotal, region } = req.query

  try {
    const { data } = await axios.get(
      region
        ? `https://restcountries.com/v3.1/region/${region}`
        : `https://restcountries.com/v3.1/all`)

    const countries = []
    let numberOfQuantityCountriesFromRegion: number = 0;

    switch (region) {
      case 'Africa':
        numberOfQuantityCountriesFromRegion = ALL_AFRICA_COUNTRIES
        
        break;
      case 'Americas':
        numberOfQuantityCountriesFromRegion = ALL_AMERICAS_COUNTRIES

        break;
      case 'Asia':
        numberOfQuantityCountriesFromRegion = ALL_ASIA_COUNTRIES
  
        break;
      case 'Europe':
        numberOfQuantityCountriesFromRegion = ALL_EUROPE_COUNTRIES

        break;
      case 'Oceania':
        numberOfQuantityCountriesFromRegion = ALL_OCEANIA_COUNTRIES
        
        break;
    }

    if (Number(countriesTotal) === numberOfQuantityCountriesFromRegion) {
      return res.send({ message: 'Max length of countries'})
    }
    
    const getTenOrMinusCountriesFromRegion = () => {
      return (numberOfQuantityCountriesFromRegion - Number(countriesTotal)) <= 10 && (numberOfQuantityCountriesFromRegion - Number(countriesTotal)) !== 0
        ? -(numberOfQuantityCountriesFromRegion - Number(countriesTotal))
        : -10
    }

    for (let i = 0; i < Number(countriesTotal) + 10; i++) {
      if (i === numberOfQuantityCountriesFromRegion) {
        break;
      } else {
        const country = {
          capital: data[i]?.capital?.[0] || null,
          countryName: data[i]?.name?.common || null,
          population: data[i]?.population || null,
          region: data[i]?.region || null,
          flags: {
            png: data[i]?.flags.png || null,
            svg: data[i]?.flags.svg || null,
          },
        }
  
        countries.push(country)
      }
    }

    const getLastCountries = countries.slice(getTenOrMinusCountriesFromRegion())

    return res.json(getLastCountries)
  } catch (error) {
    return res.status(500).send(error)
  }
}
