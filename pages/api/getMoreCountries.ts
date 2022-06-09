/* eslint-disable no-undef */
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

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

    for (let i = 0; i < Number(countriesTotal) + 10; i++) {
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

    const getLastTenCountries = countries.slice(-10)

    return res.json(getLastTenCountries)
  } catch (error) {
    return res.status(500).json({ error })
  }
}
