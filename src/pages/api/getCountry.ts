/* eslint-disable no-undef */
import { NextApiRequest, NextApiResponse } from 'next'
import { countriesRequest } from '../../services/axios'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CountryInformations[] | any>,
) => {
  const { name } = req.query

  console.log(name)

  const { data: countryData } = await countriesRequest.get(`/name/${name}`, {
    transformResponse: [
      (data) => {
        const [parsedData] = JSON.parse(data)

        const country = {
          capital: parsedData?.capital?.[0] || null,
          countryName: parsedData?.name?.common || null,
          population: parsedData?.population || null,
          region: parsedData?.region || null,
          sub_region: parsedData?.subregion || null,
          top_level_domain: parsedData?.tld || null,
          currencies: parsedData?.currencies || null,
          languages: parsedData?.languages || null,
          flags: {
            png: parsedData?.flags?.png || null,
            svg: parsedData?.flags?.svg || null,
          },
        }
        // console.log(country)

        return country
      },
    ],
  })

  return res.json(countryData)
}
