import { About } from "@/components/About";
import { Amenities } from "@/components/Amenities";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { LocationMap } from "@/components/LocationMap";
import { MobileCallBar } from "@/components/MobileCallBar";
import { Navbar } from "@/components/Navbar";
import { PlotSizes } from "@/components/PlotSizes";
import { Testimonials } from "@/components/Testimonials";
import { WhyChooseUs } from "@/components/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <FeaturedProject />
        <PlotSizes />
        <Amenities />
        <WhyChooseUs />
        <Gallery />
        <LocationMap />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <MobileCallBar />
    </>
  );
}
