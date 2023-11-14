import { Toaster } from 'sonner'
import Preloader from "@/components/preloader";
export const metadata = {
  title: "Login",
  description: "Login",
};
export default function LoginLayout({ children }) {
  return (
    <section>
      <Toaster />
      <Preloader />
      {children}
    </section>
  )
}