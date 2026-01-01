import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToApply = () => {
    const element = document.getElementById("apply");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Financial growth"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="animate-fade-in-up">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6 backdrop-blur-sm">
            Your Trusted Financial Partner
          </span>
        </div>
        
        <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground leading-tight mb-6">
          Unlock Your Future.
          <br />
          <span className="text-secondary">Achieve Your Dreams</span>
          <br />
          with Dream2Reality.
        </h1>
        
        <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
          We provide comprehensive financial solutions including loans, insurance, travel bookings, 
          and investments to help you transform your aspirations into reality.
        </p>

        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="xl" onClick={scrollToApply}>
            Get Started Today
          </Button>
          <Button variant="hero-outline" size="xl" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
            Learn More
          </Button>
        </div>

      

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
