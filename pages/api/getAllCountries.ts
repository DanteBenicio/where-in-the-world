/* eslint-disable no-undef */
import { NextApiRequest, NextApiResponse } from 'next'
import { countriesRequest } from '../../src/services/axios'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<CountryInformations[]>,
) => {
  try {
    const { data: countriesData } = await countriesRequest.get<
      CountryInformations[]
    >('/all')

    res.json(countriesData)
  } catch (error) {
    console.error(error)

    return error as any
  }
}
