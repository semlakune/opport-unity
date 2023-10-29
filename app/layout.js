import "./globals.css";
import { wotfardRegular, wotfardBold, sriracha, leagueMono } from "@/lib/fonts";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Preloader from "@/components/preloader";
config.autoAddCss = false;

export const metadata = {
  title: {
    template: '%s | OpportUnity',
    default: 'OpportUnity',
  },
  description: "Connect with unique opportunities",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${wotfardRegular.variable} ${wotfardBold.variable} ${sriracha.variable} ${leagueMono.variable}`}
    >
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
