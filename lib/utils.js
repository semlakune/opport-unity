import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {PrismaClient} from "@prisma/client";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount) => {
  let [lowerSalary, upperSalary] = amount?.split('-');
  let formattedLowerSalary = `Rp.${lowerSalary}`;
  let formattedUpperSalary = `Rp.${upperSalary}`;

  return `${formattedLowerSalary} - ${formattedUpperSalary}`;
}

export const formatSalary = (amount) => {
  let upperRange = amount?.split('-')[1];

  let upperSalary = parseInt(upperRange?.replace(/\./g, ''), 10);
  return `Rp. ${upperSalary / 1000000}juta`;
}

export const getInitials = (fullName) => {
  const nameParts = fullName.trim().split(/\s+/);
  if (nameParts.length > 2) {
    return nameParts[0][0].toUpperCase() + nameParts[nameParts.length - 1][0].toUpperCase();
  } else {
    return nameParts.map(name => name[0].toUpperCase()).join('');
  }
}

export const exclude = (user, keys) => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

export const prisma = new PrismaClient();