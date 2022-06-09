/* eslint-disable no-undef */
import { NextApiRequest, NextApiResponse } from 'next'
import { countriesRequest } from '../../src/services/axios'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CountryInformations[] | any>,
) => {
  const { name } = req.query

  const { data: [data] } = await countriesRequest.get(`/name/${name}`)

  const countryData = {
    capital: data?.capital?.[0] || null,
    countryName: data?.name?.common || null,
    nativeName: data?.name?.nativeName || null,
    population: data?.population || null,
    region: data?.region || null,
    sub_region: data?.subregion || null,
    top_level_domain: data?.tld || null,
    currencies: data?.currencies || null,
    languages: data?.languages || null,
    borders: data?.borders || null,
    flags: {
      png: data?.flags?.png || null,
      svg: data?.flags?.svg || null,
    },
  }

  return res.json(countryData)
}
