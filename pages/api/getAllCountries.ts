/* eslint-disable no-undef */
import { NextApiRequest, NextApiResponse } from 'next'
import { countriesRequest } from '../../src/services/axios'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CountryInformations[] | any>,
) => {
  try {
    const { data } = await countriesRequest.get('/all')

    const countriesData: CountryInformations[] = []

    for (let i = 0; i < 10; i++) {
      const country: CountryInformations = {
        capital: data[i]?.capital?.[0] || null,
        countryName: data[i]?.name?.common || null,
        population: data[i]?.population || null,
        region: data[i]?.region || null,
        sub_region: data[i]?.subregion || null,
        top_level_domain: data[i]?.tld || null,
        currencies: data[i]?.currencies || null,
        languages: data[i]?.languages || null,
        flags: {
          png: data[i]?.flags.png || null,
          svg: data[i]?.flags.svg || null,
        },
      }

      countriesData.push(country)
    }

    res.json(countriesData)
  } catch (error) {
    console.error(error)

    return res.status(500).send(error)
  }
}
