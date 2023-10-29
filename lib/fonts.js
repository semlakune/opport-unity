import {Sriracha} from "next/font/google";
import localFont from 'next/font/local'
export const sriracha = Sriracha({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-spicy',
  weight: '400',
})

export const wotfardRegular = localFont({
  src: './fonts/wotfard-regular.woff2',
  style: 'normal',
  weight: '400',
  variable: '--font-wotfard-regular',
  display: 'swap',
  // ]
})

export const wotfardBold = localFont({
  src: './fonts/wotfard-bold.woff2',
  style: 'normal',
  weight: '700',
  variable: '--font-wotfard-bold',
  display: 'swap',
})

export const leagueMono = localFont({
  src: './fonts/league-mono.woff2',
  style: 'normal',
  weight: '400',
  variable: '--font-mono',
  display: 'swap',
})