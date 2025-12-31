import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dream2Reality - Your Trusted Financial Partner | Loans, Insurance & Investments</title>
        <meta 
          name="description" 
          content="Dream2Reality offers comprehensive financial solutions including home loans, personal loans, insurance, travel bookings, and investment planning in Jalandhar, Punjab."
        />
        <meta 
          name="keywords" 
          content="Dream2Reality, loans, insurance, investments, home loan, car loan, personal loan, business loan, health insurance, Jalandhar, Punjab"
        />
        <link rel="canonical" href="https://dream2reality.in" />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Expertise />
          <ApplicationForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
