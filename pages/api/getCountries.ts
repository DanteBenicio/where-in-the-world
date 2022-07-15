/* eslint-disable no-undef */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CountryInformations | unknown>,
) => {
  const { region } = req.query;

  try {
    const { data } = await axios.get(`https://restcountries.com/v3.1/region/${region}`);

    const countries = [];

    for (let i = 0; i < 10; i++) {
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
      };

      countries.push(country);
    }

    return res.json(countries);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: error });
  }
};
