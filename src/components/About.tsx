import { Target, Users, Award, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Turning Financial Dreams Into
              <span className="text-accent"> Reality</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Dream2Reality is a comprehensive financial services firm based in Jalandhar, Punjab. 
              We specialize in providing tailored solutions for all your financial needs – from loans 
              and insurance to travel bookings and investment planning.
            </p>
            <p className="text-muted-foreground mb-8">
              With over a decade of experience and thousands of satisfied clients, we understand that 
              every dream is unique. Our expert team works closely with you to find the perfect 
              financial solution that aligns with your goals and circumstances.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Client-Focused</h4>
                  <p className="text-sm text-muted-foreground">Your goals are our priority</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Trusted Expertise</h4>
                  <p className="text-sm text-muted-foreground">Decades of experience</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Personal Touch</h4>
                  <p className="text-sm text-muted-foreground">Dedicated support team</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Growth Partner</h4>
                  <p className="text-sm text-muted-foreground">Long-term relationships</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 lg:p-12">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-xl opacity-50" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-xl" />
              
              <div className="relative z-10 space-y-6">
                <div className="bg-card/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="text-primary-foreground font-semibold text-lg mb-2">Our Mission</h4>
                  <p className="text-primary-foreground/80 text-sm">
                    To empower individuals and businesses with accessible, transparent, and 
                    personalized financial solutions that transform aspirations into achievements.
                  </p>
                </div>
                
                <div className="bg-card/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="text-primary-foreground font-semibold text-lg mb-2">Our Vision</h4>
                  <p className="text-primary-foreground/80 text-sm">
                    To be the most trusted financial partner in Punjab, known for integrity, 
                    innovation, and unwavering commitment to client success.
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-secondary/30 border-2 border-primary flex items-center justify-center text-xs font-medium text-primary-foreground"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <p className="text-primary-foreground/80 text-sm">
                    Join 5000+ happy clients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
