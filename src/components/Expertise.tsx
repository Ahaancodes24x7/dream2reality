import { 
  Home, 
  Car, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Plane, 
  PiggyBank, 
  Shield 
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Home Loan",
    description: "Realize your dream home with competitive rates and flexible repayment options.",
    category: "Loan",
  },
  {
    icon: Car,
    title: "Vehicle Loan",
    description: "Get on the road with car and commercial vehicle financing solutions.",
    category: "Loan",
  },
  {
    icon: Briefcase,
    title: "Business Loan",
    description: "Fuel your business growth with quick approvals and minimal documentation.",
    category: "Loan",
  },
  {
    icon: GraduationCap,
    title: "Study Loan",
    description: "Invest in education with student loans for domestic and international studies.",
    category: "Loan",
  },
  {
    icon: Shield,
    title: "Insurance",
    description: "Comprehensive coverage for health, vehicle, home, and business protection.",
    category: "Insurance",
  },
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Secure your family's health with plans that cover medical emergencies.",
    category: "Insurance",
  },
  {
    icon: Plane,
    title: "Travel Tickets",
    description: "Book flights, trains, and buses at competitive prices for your journeys.",
    category: "Tickets",
  },
  {
    icon: PiggyBank,
    title: "Investments",
    description: "Grow your wealth with mutual funds and strategic investment planning.",
    category: "Investment",
  },
];

const Expertise = () => {
  return (
    <section id="expertise" className="section-padding bg-muted/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Comprehensive Financial
            <span className="text-accent"> Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From loans to investments, we offer a complete range of services to meet all your financial needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group card-elegant p-6 bg-card hover:bg-primary transition-colors duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-3 rounded-xl bg-secondary group-hover:bg-primary-foreground/10 w-fit mb-4 transition-colors">
                <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <span className="text-xs font-medium text-accent group-hover:text-secondary uppercase tracking-wider">
                {service.category}
              </span>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary-foreground mt-1 mb-2 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Not sure which service is right for you? We're here to help.
          </p>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
          >
            Contact our experts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
