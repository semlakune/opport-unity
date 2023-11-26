import ScrollTop from "@/components/ScrollTop";

export const metadata = {
  title: "Jobs",
  description: "Jobs",
};
export default function JobLayout({ children }) {
  return (
    <section>
      {children}
      <ScrollTop />
    </section>
  )
}