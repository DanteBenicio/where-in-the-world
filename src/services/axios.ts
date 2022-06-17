import axios from 'axios'

export const api = axios.create({
  baseURL: `${process.env.BASE_URL}/api`
})

export const countriesRequest = axios.create({
  baseURL: process.env.COUNTRIES_API_URL,
})
