import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setSearchParams(
  pathname: string,
  searchParams: URLSearchParams,
  key: string,
  value?: string | null,
) {
  const params = new URLSearchParams(searchParams);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  return `${pathname}?${params.toString()}`;
}
