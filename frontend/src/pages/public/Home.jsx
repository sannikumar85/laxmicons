import Hero from "../../components/home/Hero";
import ServicesPreview from "../../components/home/ServicesPreview";
import Stats from "../../components/home/Stats";
import FeaturedProjects from "../../components/home/FeaturedProjects";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import Testimonials from "../../components/home/Testimonials";
import HomeCTA from "../../components/home/HomeCTA";

function Home() {
  return (
    <>
      <Hero />

      <ServicesPreview />

      <Stats />

      <FeaturedProjects />

      <WhyChooseUs />

      <Testimonials />

      <HomeCTA />
    </>
  );
}

export default Home;