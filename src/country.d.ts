/* eslint-disable no-unused-vars */
type CountryInformations = {
  capital: string
  countryName: string
  population: number
  region: string
  sub_region: string
  top_level_domain: string[]
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  nativeName: {
    [key: string]: {
      official: string
      common: string
    }
  }
  languages: {
    [key: string]: string
  }
  flags: {
    png: string
    svg: string
  }
}
