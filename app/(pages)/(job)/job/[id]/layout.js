import ScrollTop from "@/components/ScrollTop";
import Navbar from "@/components/Navbar";

export default function JobDetailLayout({ children }) {
  return (
    <section>
      <Navbar />
      <main className={"pt-[4rem] container"}>
        {children}
      </main>
      <ScrollTop />
    </section>
  );
}