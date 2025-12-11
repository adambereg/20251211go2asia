/**
 * Rielt.Market Asia - Validation
 * Функции валидации форм
 */

import type { Listing, Pricing, Address } from '../types';

/**
 * Валидация цены
 */
export function validatePricing(pricing: Pricing): string[] {
  const errors: string[] = [];

  if (!pricing.perNight && !pricing.perMonth) {
    errors.push('Укажите цену за ночь или за месяц');
  }

  if (pricing.perNight && pricing.perNight < 0) {
    errors.push('Цена за ночь не может быть отрицательной');
  }

  if (pricing.perMonth && pricing.perMonth < 0) {
    errors.push('Цена за месяц не может быть отрицательной');
  }

  if (!pricing.currency) {
    errors.push('Укажите валюту');
  }

  return errors;
}

/**
 * Валидация адреса
 */
export function validateAddress(address: Address): string[] {
  const errors: string[] = [];

  if (!address.country) {
    errors.push('Укажите страну');
  }

  if (!address.city) {
    errors.push('Укажите город');
  }

  if (!address.coordinates || !address.coordinates.lat || !address.coordinates.lng) {
    errors.push('Укажите координаты');
  }

  return errors;
}

/**
 * Валидация объявления
 */
export function validateListing(listing: Partial<Listing>): string[] {
  const errors: string[] = [];

  if (!listing.title || listing.title.trim().length < 10) {
    errors.push('Заголовок должен содержать минимум 10 символов');
  }

  if (!listing.description || listing.description.trim().length < 50) {
    errors.push('Описание должно содержать минимум 50 символов');
  }

  if (!listing.type) {
    errors.push('Укажите тип жилья');
  }

  if (!listing.rentalType) {
    errors.push('Укажите тип аренды');
  }

  if (!listing.address) {
    errors.push('Укажите адрес');
  } else {
    errors.push(...validateAddress(listing.address));
  }

  if (!listing.pricing) {
    errors.push('Укажите цену');
  } else {
    errors.push(...validatePricing(listing.pricing));
  }

  if (!listing.photos || listing.photos.length === 0) {
    errors.push('Добавьте хотя бы одно фото');
  }

  if (!listing.maxGuests || listing.maxGuests < 1) {
    errors.push('Укажите количество гостей');
  }

  return errors;
}

