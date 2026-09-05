import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to conditionally merge CSS class names with Tailwind CSS conflict resolution.
 * 
 * @param inputs - Class names, conditions, or arrays.
 * @returns Optimized class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
