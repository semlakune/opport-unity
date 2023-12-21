import "./globals.css";
import {
  sriracha,
  leagueMono,
  bariolRegular,
  bariolBold,
  bariolLight,
  bariolItalic,
} from "@/lib/fonts";
import SessionProvider from "@/lib/sessionProvider";
import { getServerSession } from "next-auth";
import ScrollTop from "@/components/ScrollTop";
import Providers from "@/app/providers";

export const metadata = {
  title: {
    template: "%s | OpportUnity",
    default: "OpportUnity",
  },
  description: "Connect with unique opportunities",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html
      lang="en"
      className={`${sriracha.variable} ${leagueMono.variable} ${bariolRegular.variable} ${bariolBold.variable} ${bariolLight.variable} ${bariolItalic.variable}`}
    >
      <body suppressHydrationWarning={true}>
        <Providers>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </Providers>
        <ScrollTop />
      </body>
    </html>
  );
}
