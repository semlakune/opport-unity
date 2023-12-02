import Navbar from "@/components/Navbar";
import Orbit from "@/components/Orbit";
import Footer from "@/components/Footer";
import Home from "@/components/pages/home/Home";

export default async function HomePage() {
  return (
    <div>
      <Navbar isLanding={true} />
      <Orbit />
      <Home />
      <Footer />
    </div>
  );
}
