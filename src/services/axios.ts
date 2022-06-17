import axios from 'axios'

export const api = axios.create({
  baseURL: "https://where-in-the-world-psi.vercel.app/api"
})

export const countriesRequest = axios.create({
  baseURL: process.env.COUNTRIES_API_URL,
})
