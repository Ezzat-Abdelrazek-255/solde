import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isToday(date: Date, today: Date) {
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isWithinRange(date: Date, start: Date, end: Date) {
  return date >= start && date <= end;
}

export const formatDate = (date: Date) => {
  // Create a new Date object

  // Get the year, month, and day
  let year = date.getFullYear();
  let month: number | string = date.getMonth() + 1; // Add 1 to the month (as it starts from 0)
  let day: number | string = date.getDate();

  // Pad month and day with leading zeros if needed
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  // Concatenate the parts with "-" separator
  const formattedDate = year + "-" + month + "-" + day;

  return formattedDate;
};
