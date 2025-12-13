/**
 * Atlas API Types
 * "8?K DTO 4;O <>4C;O Atlas Asia
 */

export interface Country {
  id: string;
  slug: string;
  name: string;
  name_en?: string;
  region: string;
  short_description: string;
  hero_image_url?: string;
  is_active: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: string;
  country_id: string;
  slug: string;
  name: string;
  name_en?: string;
  short_description: string;
  hero_image_url?: string;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface Place {
  id: string;
  city_id: string;
  country_id: string;
  slug: string;
  name: string;
  type: string;
  categories: string[];
  tags?: string[];
  short_description: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  hero_image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CountryContentSections {
  overview?: string;
  history?: string;
  geography?: string;
  culture?: string;
  living?: string;
  visas?: string;
  business?: string;
}

export interface CityDistrict {
  id: string;
  name: string;
  description: string;
  is_center?: boolean;
  tags?: string[];
}

export interface CityContent {
  overview?: string;
  districts?: CityDistrict[];
  lifestyle?: string;
}

export interface CountryPageData {
  country: Country;
  content: CountryContentSections;
  cities: City[];
}

export interface CityPageData {
  city: City;
  content: CityContent;
  featured_places: Place[];
  other_places?: Place[];
}

export interface PlacePageData {
  place: Place;
  description?: string;
  rating_summary?: {
    average_rating: number;
    ratings_count: number;
  };
}

export interface GetCountriesParams {
  active_only?: boolean;
  region?: string;
}

export interface GetCitiesParams {
  country_id?: string;
  active_only?: boolean;
}

export interface GetPlacesParams {
  city_id?: string;
  type?: string[];
  categories?: string[];
  tags?: string[];
  has_rf_only?: boolean;
  has_quests_only?: boolean;
  has_events_only?: boolean;
}
