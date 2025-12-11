/**
 * Rielt.Market Asia - Calendar
 * Функции работы с календарём доступности
 */

/**
 * Проверить, доступна ли дата
 */
export function isDateAvailable(
  date: Date,
  calendar: Record<string, boolean>
): boolean {
  const dateStr = date.toISOString().split('T')[0];
  return calendar[dateStr] !== false; // По умолчанию доступно, если не помечено как занято
}

/**
 * Получить диапазон дат между check-in и check-out
 */
export function getDateRange(checkIn: Date, checkOut: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(checkIn);
  
  while (current < checkOut) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
}

/**
 * Проверить доступность диапазона дат
 */
export function isDateRangeAvailable(
  checkIn: Date,
  checkOut: Date,
  calendar: Record<string, boolean>
): boolean {
  const dates = getDateRange(checkIn, checkOut);
  return dates.every((date) => isDateAvailable(date, calendar));
}

/**
 * Форматировать дату для отображения
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Форматировать диапазон дат
 */
export function formatDateRange(checkIn: Date | string, checkOut: Date | string): string {
  return `${formatDate(checkIn)} — ${formatDate(checkOut)}`;
}

/**
 * Вычислить количество ночей между датами
 */
export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

