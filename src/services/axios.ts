import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.BASE_URL + '/api' || 'http://localhost:3000/api'
})

export const countriesRequest = axios.create({
  baseURL: process.env.COUNTRIES_API_URL,
})
