import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {useEffect, useLayoutEffect} from "react";
import {useSession} from "next-auth/react";
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
