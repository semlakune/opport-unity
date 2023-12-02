import ScrollTop from "@/components/ScrollTop";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "Jobs",
  description: "Jobs",
};
export default function JobLayout({ children }) {
  return (
    <section>
      <Navbar />
      {children}
      <ScrollTop />
    </section>
  )
}