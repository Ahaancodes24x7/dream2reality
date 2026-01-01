import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const loanItems = [
  { name: "Home Loan", href: "#home-loan" },
  { name: "Loan Against Property", href: "#lap" },
  { name: "Car Loan", href: "#car-loan" },
  { name: "Commercial Vehicle Loan", href: "#cv-loan" },
  { name: "Personal Loan", href: "#personal-loan" },
  { name: "Business Loan", href: "#business-loan" },
  { name: "Study Loan", href: "#study-loan" },
];

const insuranceItems = [
  { name: "Car Insurance", href: "#car-insurance" },
  { name: "Commercial Vehicle Insurance", href: "#cv-insurance" },
  { name: "Home Insurance", href: "#home-insurance" },
  { name: "Health Insurance", href: "#health-insurance" },
  { name: "Business/Shop Insurance", href: "#business-insurance" },
  { name: "Overseas Insurance", href: "#overseas-insurance" },
];

const ticketItems = [
  { name: "Flight Tickets", href: "#flight" },
  { name: "Bus Tickets", href: "#bus" },
  { name: "Train Tickets", href: "#train" },
];

const investmentItems = [
  { name: "Insurance", href: "#investment-insurance" },
  { name: "Mutual Funds", href: "#mutual-funds" },
  { name: "Investment Planning", href: "#investment-planning" },
];

interface DropdownProps {
  title: string;
  items: { name: string; href: string }[];
  isOpen: boolean;
  onToggle: () => void;
}

const DropdownMenu = ({ title, items, isOpen, onToggle }: DropdownProps) => {
  return (
    <div className="relative group">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      <div className={`absolute top-full left-0 mt-1 w-56 rounded-lg bg-card shadow-elegant border border-border overflow-hidden transition-all duration-200 z-50 ${
        isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
      }`}>
        <div className="py-2">
          {items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Dream2Reality" className="h-12 md:h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => scrollToSection("home")}
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            
            <DropdownMenu
              title="Loan"
              items={loanItems}
              isOpen={openDropdown === "loan"}
              onToggle={() => handleDropdownToggle("loan")}
            />
            <DropdownMenu
              title="Insurance"
              items={insuranceItems}
              isOpen={openDropdown === "insurance"}
              onToggle={() => handleDropdownToggle("insurance")}
            />
            <DropdownMenu
              title="Tickets"
              items={ticketItems}
              isOpen={openDropdown === "tickets"}
              onToggle={() => handleDropdownToggle("tickets")}
            />
            <DropdownMenu
              title="Investments"
              items={investmentItems}
              isOpen={openDropdown === "investments"}
              onToggle={() => handleDropdownToggle("investments")}
            />
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              variant="hero"
              size="default"
              onClick={() => scrollToSection("apply")}
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-screen pb-4" : "max-h-0"}`}>
          <div className="pt-4 space-y-2">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-md"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-md"
            >
              About
            </button>
            
            {/* Mobile Dropdowns */}
            <MobileDropdown title="Loan" items={loanItems} />
            <MobileDropdown title="Insurance" items={insuranceItems} />
            <MobileDropdown title="Tickets" items={ticketItems} />
            <MobileDropdown title="Investments" items={investmentItems} />
            
            <div className="pt-4">
              <Button
                variant="hero"
                className="w-full"
                onClick={() => scrollToSection("apply")}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MobileDropdown = ({ title, items }: { title: string; items: { name: string; href: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-md"
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="pl-4 py-1 space-y-1">
          {items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
