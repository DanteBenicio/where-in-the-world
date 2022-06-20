import { NextApiRequest, NextApiResponse } from "next";
import { countriesRequest } from "../../src/services/axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;

  if (name) {
    try {
      const { data } = await countriesRequest.get(`/name/${name}`)

      const countries = [];

      for (let i = 0; i < 10; i++) {
        if (data[i]?.name?.common) {
          const country = {
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
    
          countries.push(country)
        }
      }

      console.log(countries, 'asdas')

      return res.json(countries);
    } catch (error) {
      console.error(error)

      return res.status(500).send(error)
    }
  }
}