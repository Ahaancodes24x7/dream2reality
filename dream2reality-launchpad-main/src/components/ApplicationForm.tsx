import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  mobile: z.string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  service: z.string().min(1, "Please select a service"),
  subService: z.string().min(1, "Please select a sub-category"),
  message: z.string().max(500, "Message is too long").optional(),
});

type FormData = z.infer<typeof formSchema>;

const serviceOptions = {
  loan: [
    "Home Loan",
    "Loan Against Property",
    "Car Loan",
    "Commercial Vehicle Loan",
    "Personal Loan",
    "Business Loan",
    "Study Loan",
  ],
  insurance: [
    "Car Insurance",
    "Commercial Vehicle Insurance",
    "Home Insurance",
    "Health Insurance",
    "Business/Shop Insurance",
    "Overseas Insurance",
  ],
  tickets: ["Flight Tickets", "Bus Tickets", "Train Tickets"],
  investments: ["Insurance Plans", "Mutual Funds", "Investment Planning"],
};

const ApplicationForm = () => {
  const [selectedService, setSelectedService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedService(value);
    setValue("service", value);
    setValue("subService", "");
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      console.log("Form data:", data);
      
      // Call the edge function to send email
      const { data: result, error } = await supabase.functions.invoke("send-application", {
        body: {
          name: data.name,
          mobile: data.mobile,
          service: data.service,
          subService: data.subService,
          message: data.message,
        },
      });

      if (error) {
        throw error;
      }

      console.log("Email sent:", result);
      
      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll contact you within 24 hours.",
      });
      
      reset();
      setSelectedService("");
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly at +91 9876610225",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubServices = () => {
    return serviceOptions[selectedService as keyof typeof serviceOptions] || [];
  };

  return (
    <section id="apply" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
              Apply Now
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Ready to Get
              <span className="text-accent"> Started?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Fill out the form and our team will get in touch with you within 24 hours. 
              We're here to help you achieve your financial goals.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">Quick 24-hour response time</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">No hidden fees or charges</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground">Personalized financial advice</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card-elegant p-8 lg:p-10 bg-card">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                  Thank You!
                </h3>
                <p className="text-muted-foreground">
                  Your application has been submitted successfully. We'll contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="mt-1.5"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="mobile" className="text-foreground font-medium">
                    Mobile Number *
                  </Label>
                  <div className="flex mt-1.5">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      +91
                    </span>
                    <Input
                      id="mobile"
                      placeholder="9876543210"
                      className="rounded-l-none"
                      maxLength={10}
                      {...register("mobile")}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-sm text-destructive mt-1">{errors.mobile.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="service" className="text-foreground font-medium">
                    Service Category *
                  </Label>
                  <select
                    id="service"
                    className="mt-1.5 w-full h-10 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    {...register("service")}
                    onChange={handleServiceChange}
                  >
                    <option value="">Select a service</option>
                    <option value="loan">Loan</option>
                    <option value="insurance">Insurance</option>
                    <option value="tickets">Tickets</option>
                    <option value="investments">Investments</option>
                  </select>
                  {errors.service && (
                    <p className="text-sm text-destructive mt-1">{errors.service.message}</p>
                  )}
                </div>

                {selectedService && (
                  <div className="animate-fade-in">
                    <Label htmlFor="subService" className="text-foreground font-medium">
                      Sub-Category *
                    </Label>
                    <select
                      id="subService"
                      className="mt-1.5 w-full h-10 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      {...register("subService")}
                    >
                      <option value="">Select sub-category</option>
                      {getSubServices().map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                    {errors.subService && (
                      <p className="text-sm text-destructive mt-1">{errors.subService.message}</p>
                    )}
                  </div>
                )}

                <div>
                  <Label htmlFor="message" className="text-foreground font-medium">
                    Additional Message (Optional)
                  </Label>
                  <textarea
                    id="message"
                    placeholder="Tell us more about your requirements..."
                    className="mt-1.5 w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    rows={3}
                    {...register("message")}
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to our privacy policy and consent to be contacted.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
