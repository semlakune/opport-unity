import {Sriracha} from "next/font/google";
import localFont from 'next/font/local'
export const sriracha = Sriracha({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-spicy',
  weight: '400',
})

export const leagueMono = localFont({
  src: './fonts/league-mono.woff2',
  style: 'normal',
  weight: '400',
  variable: '--font-mono',
  display: 'swap',
})

export const bariolRegular = localFont({
  src: './fonts/bariol_regular-webfont.woff2',
  style: 'normal',
  weight: '400',
  variable: '--font-bariol-regular',
  display: 'swap',
})

export const bariolBold = localFont({
  src: './fonts/bariol_bold-webfont.woff2',
  style: 'normal',
  weight: '700',
  variable: '--font-bariol-bold',
  display: 'swap',
})

export const bariolLight = localFont({
  src: './fonts/bariol_light-webfont.woff2',
  style: 'normal',
  weight: '300',
  variable: '--font-bariol-light',
  display: 'swap',
})

export const bariolItalic = localFont({
  src: './fonts/bariol_bold_italic-webfont.woff2',
  style: 'normal',
  weight: '400',
  variable: '--font-bariol-italic',
  display: 'swap',
})