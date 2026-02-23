import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutPreview from "@/components/AboutPreview";
import KeyLessons from "@/components/KeyLessons";
import HoneyBenefits from "@/components/HoneyBenefits";
import FeaturedProducts from "@/components/FeaturedProducts";
import BeeKeepingTradition from "@/components/BeeKeepingTradition";
import SaveTheBees from "@/components/SaveTheBees";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutPreview />
        <KeyLessons />
        <HoneyBenefits />
        <FeaturedProducts />
        <BeeKeepingTradition />
        <SaveTheBees />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
