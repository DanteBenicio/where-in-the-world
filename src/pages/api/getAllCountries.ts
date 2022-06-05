/* eslint-disable no-undef */
import { NextApiRequest, NextApiResponse } from 'next'
import { countriesRequest } from '../../services/axios'

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
              countryName: parsedData[i]?.name?.common,
              population: parsedData[i]?.population,
              region: parsedData[i]?.region,
              sub_region: parsedData[i]?.subregion || null,
              top_level_domain: parsedData[i]?.tld,
              currencies: parsedData[i]?.currencies || null,
              languages: parsedData[i]?.languages,
              flags: {
                png: parsedData[i]?.flags.png,
                svg: parsedData[i]?.flags.svg,
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
