import { format, isValid } from 'date-fns';

export function safeFormatDate(value: string, pattern: string) {
  const date = new Date(value);
  if (!isValid(date)) return '—';
  return format(date, pattern);
}
