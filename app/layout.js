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
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import StoreProvider from "@/app/StoreProvider";

export const metadata = {
  title: {
    template: "%s | OpportUnity",
    default: "OpportUnity",
  },
  description: "Connect with unique opportunities",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html
      lang="en"
      className={`${sriracha.variable} ${leagueMono.variable} ${bariolRegular.variable} ${bariolBold.variable} ${bariolLight.variable} ${bariolItalic.variable}`}
    >
      <body>
        <Providers>
          <SessionProvider session={session}>
            <StoreProvider>
              {children}
            </StoreProvider>
          </SessionProvider>
        </Providers>
        <ScrollTop />
      </body>
    </html>
  );
}
