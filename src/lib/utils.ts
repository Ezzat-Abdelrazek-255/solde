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
  let dateFinal = new Date(date);

  // Get the year, month, and day
  let year = dateFinal.getFullYear();
  let month: number | string = dateFinal.getMonth() + 1; // Add 1 to the month (as it starts from 0)
  let day: number | string = dateFinal.getDate();

  // Pad month and day with leading zeros if needed
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  // Concatenate the parts with "-" separator
  const formattedDate = year + "-" + month + "-" + day;

  return formattedDate;
};

export function toCamelCase(str: string | undefined) {
  if (!str) return str;
  // Replace special characters and spaces with a hyphen
  str = str.replace(/[^a-zA-Z0-9]+/g, "-");

  // Split the string into words and convert them to lowercase
  const words = str.toLowerCase().split("-");

  // Capitalize the first character of each word except the first word
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word;
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  });

  // Join the words back into a single string
  return camelCaseWords.join("");
}
