import "./globals.css";
import { wotfardRegular, wotfardBold, sriracha, leagueMono } from "@/lib/fonts";
import SessionProvider from "@/lib/sessionProvider";
import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/toaster"
import ScrollTop from "@/components/ScrollTop";

export const metadata = {
  title: {
    template: '%s | OpportUnity',
    default: 'OpportUnity',
  },
  description: "Connect with unique opportunities",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html
      lang="en"
      className={`${wotfardRegular.variable} ${wotfardBold.variable} ${sriracha.variable} ${leagueMono.variable}`}
    >
      <body suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        <Toaster />
        <ScrollTop />
      </body>
    </html>
  );
}
