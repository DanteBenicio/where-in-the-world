/* eslint-disable no-undef */
import { NextApiRequest, NextApiResponse } from 'next';
import { countriesRequest } from '../../src/services/axios';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CountryInformations[] | any>,
) => {
  const { name } = req.query;

  try {
    const { data } = await countriesRequest.get(`name/${name}`, {
      params: {
        fullText: 'true',
      },
    });

    const [countryInfo] = data;

    const countryData = {
      capital: countryInfo?.capital?.[0] || null,
      countryName: countryInfo?.name?.common || null,
      nativeName: countryInfo?.name?.nativeName || null,
      population: countryInfo?.population || null,
      region: countryInfo?.region || null,
      sub_region: countryInfo?.subregion || null,
      top_level_domain: countryInfo?.tld || null,
      currencies: countryInfo?.currencies || null,
      languages: countryInfo?.languages || null,
      borders: countryInfo?.borders || null,
      flags: {
        png: countryInfo?.flags?.png || null,
        svg: countryInfo?.flags?.svg || null,
      },
    };

    return res.json(countryData);
  } catch (error) {
    console.error(error);

    return res.status(500).send(error);
  }
};
