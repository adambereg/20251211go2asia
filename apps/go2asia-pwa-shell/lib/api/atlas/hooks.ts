/**
 * Atlas React Query Hooks
 * React Query hooks для работы с Atlas API
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { atlasApi } from './client';
import type {
  Country,
  City,
  Place,
  CountryPageData,
  CityPageData,
  PlacePageData,
  GetCountriesParams,
  GetCitiesParams,
  GetPlacesParams,
} from './types';

/**
 * Query keys для Atlas
 */
export const atlasKeys = {
  all: ['atlas'] as const,
  countries: () => [...atlasKeys.all, 'countries'] as const,
  country: (id: string) => [...atlasKeys.countries(), id] as const,
  cities: (params?: GetCitiesParams) => [...atlasKeys.all, 'cities', params] as const,
  city: (id: string) => [...atlasKeys.all, 'cities', id] as const,
  places: (params?: GetPlacesParams) => [...atlasKeys.all, 'places', params] as const,
  place: (id: string) => [...atlasKeys.all, 'places', id] as const,
};

/**
 * Hook для получения списка стран
 */
export function useCountries(
  params?: GetCountriesParams,
  options?: Omit<UseQueryOptions<Country[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: atlasKeys.countries(),
    queryFn: () => atlasApi.getCountries(params),
    staleTime: 24 * 60 * 60 * 1000, // 24 часа
    ...options,
  });
}

/**
 * Hook для получения данных страны
 */
export function useCountry(
  countryId: string,
  options?: Omit<UseQueryOptions<CountryPageData>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: atlasKeys.country(countryId),
    queryFn: () => atlasApi.getCountry(countryId),
    enabled: !!countryId,
    staleTime: 24 * 60 * 60 * 1000, // 24 часа
    ...options,
  });
}

/**
 * Hook для получения списка городов
 */
export function useCities(
  params?: GetCitiesParams,
  options?: Omit<UseQueryOptions<City[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: atlasKeys.cities(params),
    queryFn: () => atlasApi.getCities(params),
    staleTime: 6 * 60 * 60 * 1000, // 6 часов
    ...options,
  });
}

/**
 * Hook для получения данных города
 */
export function useCity(
  cityId: string,
  options?: Omit<UseQueryOptions<CityPageData>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: atlasKeys.city(cityId),
    queryFn: () => atlasApi.getCity(cityId),
    enabled: !!cityId,
    staleTime: 6 * 60 * 60 * 1000, // 6 часов
    ...options,
  });
}

/**
 * Hook для получения списка мест
 */
export function usePlaces(
  params?: GetPlacesParams,
  options?: Omit<UseQueryOptions<Place[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: atlasKeys.places(params),
    queryFn: () => atlasApi.getPlaces(params),
    staleTime: 60 * 60 * 1000, // 1 час
    ...options,
  });
}

/**
 * Hook для получения данных места
 */
export function usePlace(
  placeId: string,
  options?: Omit<UseQueryOptions<PlacePageData>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: atlasKeys.place(placeId),
    queryFn: () => atlasApi.getPlace(placeId),
    enabled: !!placeId,
    staleTime: 60 * 60 * 1000, // 1 час
    ...options,
  });
}



