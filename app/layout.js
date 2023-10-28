import "./globals.css";
import { wotfardRegular, wotfardBold, sriracha, leagueMono } from "@/app/fonts";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Preloader from "@/components/preloader";
config.autoAddCss = false;

export const metadata = {
  title: "OpportUnity",
  description: "Connect with unique opportunities",
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
