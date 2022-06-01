/* eslint-disable no-undef */
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CountryInformations | unknown>,
) => {
  const { ID: countriesTotal } = req.query

  try {
    const { data } = await axios.get('https://restcountries.com/v3.1/all', {
      transformResponse: [
        (data) => {
          const parsedData = JSON.parse(data)
          const countries = []

          for (let i = 0; i < Number(countriesTotal) + 10; i++) {
            const country = {
              capital: parsedData[i]?.capital?.[0],
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

          const getLastTenCountries = countries.slice(-10)

          return getLastTenCountries
        },
      ],
    })

    return res.json([...data])
  } catch (error) {
    return res.status(500).json({ error })
  }
}
