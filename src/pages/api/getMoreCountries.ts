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
        : `https://restcountries.com/v3.1/all`,
      {
        transformResponse: [
          (data) => {
            const parsedData = JSON.parse(data)
            const countries = []

            for (let i = 0; i < Number(countriesTotal) + 10; i++) {
              const country = {
                capital: parsedData[i]?.capital?.[0] || null,
                countryName: parsedData[i]?.name?.common || null,
                population: parsedData[i]?.population || null,
                region: parsedData[i]?.region || null,
                flags: {
                  png: parsedData[i]?.flags.png || null,
                  svg: parsedData[i]?.flags.svg || null,
                },
              }

              countries.push(country)
            }

            const getLastTenCountries = countries.slice(-10)

            return getLastTenCountries
          },
        ],
      },
    )

    return res.json([...data])
  } catch (error) {
    return res.status(500).json({ error })
  }
}
