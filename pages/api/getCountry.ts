/* eslint-disable no-undef */
import { NextApiRequest, NextApiResponse } from 'next'
import { countriesRequest } from '../../src/services/axios'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CountryInformations[] | any>,
) => {
  const { name } = req.query

  const { data: countryData } = await countriesRequest.get(`/name/${name}`)

  return res.json(countryData)
}
