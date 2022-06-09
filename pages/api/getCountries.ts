/* eslint-disable no-undef */
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CountryInformations | unknown>,
) => {
  const { region } = req.query

  try {
    const { data } = await axios.get(
      `https://restcountries.com/v3.1/region/${region}`,
    )

    return res.json([...data])
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: error })
  }
}
