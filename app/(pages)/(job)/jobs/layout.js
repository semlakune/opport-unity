import {Suspense} from "react";
import Preloader from "@/components/Preloader";
import ScrollTop from "@/components/ScrollTop";

export const metadata = {
  title: "Job",
  description: "Job",
};
export default function JobLayout({ children }) {
  return (
    <section>
      <Suspense fallback={<Preloader />}>
        {children}
        <ScrollTop />
      </Suspense>
    </section>
  )
}