/* eslint-disable no-undef */
import { NextApiRequest, NextApiResponse } from 'next'
import { countriesRequest } from '../../src/services/axios'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CountryInformations[] | any>,
) => {
  const { name } = req.query

  console.log(name)

  const { data: countryData } = await countriesRequest.get(`/name/${name}`, {
    transformResponse: [
      (data) => {
        const getCircularReplacer = () => {
          const seen = new WeakSet();
          return (key: any, value: any) => {
            if (typeof value === 'object' && value !== null) {
              if (seen.has(value)) {
                return;
              }
              seen.add(value);
            }
            return value;
          };
        };
        const [parsedData] = JSON.parse(data, getCircularReplacer())

        const country = {
          capital: parsedData?.capital?.[0] || null,
          countryName: parsedData?.name?.common || null,
          nativeName: parsedData?.name?.nativeName || null,
          population: parsedData?.population || null,
          region: parsedData?.region || null,
          sub_region: parsedData?.subregion || null,
          top_level_domain: parsedData?.tld || null,
          currencies: parsedData?.currencies || null,
          languages: parsedData?.languages || null,
          borders: parsedData?.borders || null,
          flags: {
            png: parsedData?.flags?.png || null,
            svg: parsedData?.flags?.svg || null,
          },
        }

        return country
      },
    ],
  })

  return res.json(countryData)
}
