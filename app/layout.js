import "./globals.css";
import { wotfardRegular, wotfardBold, sriracha, leagueMono } from "@/app/fonts";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Footer from "@/components/footer";
config.autoAddCss = false

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
      <div className="preloader">
        <div className="text-container">
          <h1>Opport</h1>
          <h1>Unity</h1>
        </div>
      </div>
      {children}
      </body>
    </html>
  );
}
