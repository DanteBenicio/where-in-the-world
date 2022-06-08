/* eslint-disable no-undef */
import { NextApiRequest, NextApiResponse } from 'next'
import { countriesRequest } from '../../src/services/axios'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CountryInformations[]>,
) => {
  try {
    const { data: countriesData } = await countriesRequest.get<
      CountryInformations[]
    >('/all', {
      transformResponse: [
        (data) => {
          const parsedData = JSON.parse(data)
          const countries = []

          for (let i = 0; i < 10; i++) {
            const country = {
              capital: parsedData[i]?.capital?.[0] || null,
              countryName: parsedData[i]?.name?.common || null,
              population: parsedData[i]?.population || null,
              region: parsedData[i]?.region || null,
              sub_region: parsedData[i]?.subregion || null,
              top_level_domain: parsedData[i]?.tld || null,
              currencies: parsedData[i]?.currencies || null,
              languages: parsedData[i]?.languages || null,
              flags: {
                png: parsedData[i]?.flags.png || null,
                svg: parsedData[i]?.flags.svg || null,
              },
            }

            countries.push(country)
          }

          return countries
        },
      ],
    })

    res.json(countriesData)
  } catch (error) {
    console.error(error)

    return error as any
  }
}
