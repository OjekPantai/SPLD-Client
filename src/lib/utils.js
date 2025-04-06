import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const apiUrl = import.meta.env.VITE_API_URL;

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const toCapitalize = (str) => {
  if (!str) return "";

  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getInitials = (name) => {
  if (!name) return "AN";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export const formatImagePath = (filePath) => {
  const formattedPath = filePath?.replace(/\\/g, "/");
  return `${apiUrl}/${formattedPath}`;
};

// Truncate text function
export const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
