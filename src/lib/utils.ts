import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  } else {
    return str;
  }
}

export function formateUserId(userId: string) {
  const firstThree = userId.substring(0, 3);
  const lastTwo = userId.substring(userId.length - 2);
  return firstThree + lastTwo
}