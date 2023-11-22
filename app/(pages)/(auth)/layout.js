import { Toaster } from 'sonner'

export default function AuthLayout({ children }) {
  return (
    <section className={"w-screen h-screen bg-gradient-to-br from-[#bbe3d1] to-white"}>
      <Toaster richColors />
      {children}
    </section>
  )
}