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
    )

    return res.json([...data])
  } catch (error) {
    return res.status(500).json({ error })
  }
}
