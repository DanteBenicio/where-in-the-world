import { AxiosPromise } from 'axios';
import { api } from '../services/axios';

export async function getCountriesFromSelectedRegion(
  region: string,
): Promise<AxiosPromise<CountryInformations[]>> {
  try {
    return await api.get<CountryInformations[]>('/getCountries', {
      params: {
        region,
      },
    });
  } catch (error) {
    console.error(error);

    return error as any;
  }
}
