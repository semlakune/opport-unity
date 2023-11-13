import { Toaster } from 'sonner'
export const metadata = {
  title: "Login",
  description: "Login",
};
export default function LoginLayout({ children }) {
  return (
    <section>
      <Toaster />
      {children}
    </section>
  )
}