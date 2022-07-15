import { useContext, useEffect, useState } from 'react';
import { allContinents } from '../constants/countries-length';
import { AppContext } from '../context';

export function useCanGetMoreCountries(countries: CountryInformations[]) {
  const { selectedRegion } = useContext(AppContext);
  const [canGetMoreCountries, setCanGetMoreCountries] = useState<boolean>();
  const {
    ALL_AFRICA_COUNTRIES,
    ALL_AMERICAS_COUNTRIES,
    ALL_ASIA_COUNTRIES,
    ALL_EUROPE_COUNTRIES,
    ALL_OCEANIA_COUNTRIES,
    ALL_WORLD_COUNTRIES,
  } = allContinents;

  const verifyCountriesTotalFromSelectedRegion = (regionCountriesTotal: number) => {
    setCanGetMoreCountries(countries?.length !== regionCountriesTotal);
  };

  useEffect(() => {
    switch (selectedRegion) {
      case 'Africa':
        verifyCountriesTotalFromSelectedRegion(ALL_AFRICA_COUNTRIES);

        break;
      case 'Americas':
        verifyCountriesTotalFromSelectedRegion(ALL_AMERICAS_COUNTRIES);

        break;
      case 'Asia':
        verifyCountriesTotalFromSelectedRegion(ALL_ASIA_COUNTRIES);

        break;
      case 'Europe':
        verifyCountriesTotalFromSelectedRegion(ALL_EUROPE_COUNTRIES);

        break;
      case 'Oceania':
        verifyCountriesTotalFromSelectedRegion(ALL_OCEANIA_COUNTRIES);

        break;
      case '':
        verifyCountriesTotalFromSelectedRegion(ALL_WORLD_COUNTRIES);

        break;
      case 'All Countries':
        verifyCountriesTotalFromSelectedRegion(ALL_WORLD_COUNTRIES);

        break;
      default:
        break;
    }
  }, [countries]);

  return { canGetMoreCountries };
}
