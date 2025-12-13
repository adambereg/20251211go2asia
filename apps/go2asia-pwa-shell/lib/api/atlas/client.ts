/**
 * Atlas API Client
 * Клиент для работы с Atlas API
 */

import { apiClient } from '../client';
import { ApiResponse } from '../types';
import { ApiError } from '../errors';
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

export const atlasApi = {
  /**
   * Получить список стран
   */
  async getCountries(params?: GetCountriesParams): Promise<Country[]> {
    const queryParams = new URLSearchParams();
    if (params?.active_only !== undefined) {
      queryParams.append('active_only', String(params.active_only));
    }
    if (params?.region) {
      queryParams.append('region', params.region);
    }

    const queryString = queryParams.toString();
    const endpoint = `/api/atlas/v1/countries${queryString ? `?${queryString}` : ''}`;

    const response = await apiClient<ApiResponse<{ countries: Country[] }>>(endpoint);

    if (response.status === 'error') {
      throw new ApiError(
        500,
        response.error?.message || 'Failed to fetch countries',
        response.error
      );
    }

    return response.data?.countries || [];
  },

  /**
   * Получить данные страны
   */
  async getCountry(countryId: string): Promise<CountryPageData> {
    const response = await apiClient<ApiResponse<CountryPageData>>(
      `/api/atlas/v1/countries/${countryId}`
    );

    if (response.status === 'error') {
      throw new ApiError(
        response.error?.code === 'NOT_FOUND' ? 404 : 500,
        response.error?.message || 'Country not found',
        response.error
      );
    }

    if (!response.data) {
      throw new ApiError(404, 'Country not found');
    }

    return response.data;
  },

  /**
   * Получить список городов
   */
  async getCities(params?: GetCitiesParams): Promise<City[]> {
    const queryParams = new URLSearchParams();
    if (params?.country_id) {
      queryParams.append('country_id', params.country_id);
    }
    if (params?.active_only !== undefined) {
      queryParams.append('active_only', String(params.active_only));
    }

    const queryString = queryParams.toString();
    const endpoint = `/api/atlas/v1/cities${queryString ? `?${queryString}` : ''}`;

    const response = await apiClient<ApiResponse<{ cities: City[] }>>(endpoint);

    if (response.status === 'error') {
      throw new ApiError(
        500,
        response.error?.message || 'Failed to fetch cities',
        response.error
      );
    }

    return response.data?.cities || [];
  },

  /**
   * Получить данные города
   */
  async getCity(cityId: string): Promise<CityPageData> {
    const response = await apiClient<ApiResponse<CityPageData>>(
      `/api/atlas/v1/cities/${cityId}`
    );

    if (response.status === 'error') {
      throw new ApiError(
        response.error?.code === 'NOT_FOUND' ? 404 : 500,
        response.error?.message || 'City not found',
        response.error
      );
    }

    if (!response.data) {
      throw new ApiError(404, 'City not found');
    }

    return response.data;
  },

  /**
   * Получить список мест
   */
  async getPlaces(params?: GetPlacesParams): Promise<Place[]> {
    const queryParams = new URLSearchParams();
    if (params?.city_id) {
      queryParams.append('city_id', params.city_id);
    }
    if (params?.type) {
      params.type.forEach((t) => queryParams.append('type', t));
    }
    if (params?.categories) {
      params.categories.forEach((c) => queryParams.append('categories', c));
    }
    if (params?.tags) {
      params.tags.forEach((t) => queryParams.append('tags', t));
    }
    if (params?.has_rf_only) {
      queryParams.append('has_rf_only', 'true');
    }
    if (params?.has_quests_only) {
      queryParams.append('has_quests_only', 'true');
    }
    if (params?.has_events_only) {
      queryParams.append('has_events_only', 'true');
    }

    const queryString = queryParams.toString();
    const endpoint = `/api/atlas/v1/places${queryString ? `?${queryString}` : ''}`;

    const response = await apiClient<ApiResponse<{ places: Place[] }>>(endpoint);

    if (response.status === 'error') {
      throw new ApiError(
        500,
        response.error?.message || 'Failed to fetch places',
        response.error
      );
    }

    return response.data?.places || [];
  },

  /**
   * Получить данные места
   */
  async getPlace(placeId: string): Promise<PlacePageData> {
    const response = await apiClient<ApiResponse<PlacePageData>>(
      `/api/atlas/v1/places/${placeId}`
    );

    if (response.status === 'error') {
      throw new ApiError(
        response.error?.code === 'NOT_FOUND' ? 404 : 500,
        response.error?.message || 'Place not found',
        response.error
      );
    }

    if (!response.data) {
      throw new ApiError(404, 'Place not found');
    }

    return response.data;
  },
};



