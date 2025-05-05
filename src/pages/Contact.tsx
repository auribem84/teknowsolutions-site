
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Calendar, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  phone: z.string().optional(),
  services: z.string().array().min(1, { message: "Please select at least one service." }).optional(),
  demoType: z.string({ required_error: "Please select a demo type." }),
  notes: z.string().optional(),
});

const Contact = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSelected, setTimeSelected] = useState<string | null>(null);
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      services: [],
      demoType: "",
      notes: "",
    },
  });

  // Handle demo form submission
  const onSubmitDemo = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Demo request received! We'll contact you shortly.");
  };

  // Handle booking submission
  const handleBooking = () => {
    if (!date || !timeSelected) {
      toast.error("Please select both a date and time.");
      return;
    }
    
    toast.success("Your meeting has been scheduled! Check your email for confirmation.");
  };

  // Available time slots
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-tekmo-blue to-tekmo-purple text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch & See Tekmowsolutions in Action</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Have questions? Our team is ready to help—and show you our solutions live.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Request Demo Form */}
            <div>
              <Card className="shadow-xl">
                <CardHeader className="bg-gradient-to-r from-tekmo-teal/10 to-tekmo-purple/10">
                  <CardTitle className="text-2xl">See Tekmowsolutions Live</CardTitle>
                  <CardDescription>
                    Experience our platform in action and discover how we'll solve your IT challenges.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitDemo)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Email *</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@company.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your company" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="demoType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Demo Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a demo type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="live">Live walkthrough</SelectItem>
                                <SelectItem value="custom">Customized pilot</SelectItem>
                                <SelectItem value="technical">Technical deep-dive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your specific requirements or questions"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-tekmo-teal to-tekmo-purple hover:from-tekmo-purple hover:to-tekmo-teal transition-all"
                      >
                        Request My Demo <ArrowRight size={16} className="ml-2" />
                      </Button>
                      
                      <div className="text-xs text-center text-muted-foreground">
                        <p>We respect your privacy. No credit card required.</p>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Calendar Widget */}
            <div>
              <Card className="shadow-xl mb-8">
                <CardHeader className="bg-gradient-to-r from-tekmo-teal/10 to-tekmo-purple/10">
                  <CardTitle className="text-2xl">Schedule a Call</CardTitle>
                  <CardDescription>
                    Choose a date & time that works for you—we'll call you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-6">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-medium mb-2">Select a Date</h3>
                      <div className="border rounded-md">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => {
                            // Disable weekends and past dates
                            return date < new Date() || date.getDay() === 0 || date.getDay() === 6;
                          }}
                          className="rounded-md"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-lg font-medium mb-2">Select a Time</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={timeSelected === time ? "default" : "outline"}
                            className={`${
                              timeSelected === time ? "bg-tekmo-teal text-white" : ""
                            }`}
                            onClick={() => setTimeSelected(time)}
                          >
                            <Clock size={14} className="mr-2" /> {time}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={handleBooking}
                      className="w-full bg-gradient-to-r from-tekmo-teal to-tekmo-purple hover:from-tekmo-purple hover:to-tekmo-teal transition-all"
                    >
                      <Calendar size={16} className="mr-2" /> Book My Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Contact Options */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Additional Contact Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-tekmo-teal mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="h-5 w-5 text-tekmo-teal mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">support@tekmowsolutions.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-tekmo-teal mt-0.5" />
                    <div>
                      <h3 className="font-medium">Office</h3>
                      <p className="text-muted-foreground">
                        1234 Technology Parkway<br />
                        Suite 500<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h3 className="font-medium mb-1">Office Hours</h3>
                    <p className="text-muted-foreground">Mon–Fri, 9 AM–6 PM EST</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      24/7 support available for enterprise customers
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Footer CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4">Still unsure?</h3>
            <Button variant="outline" className="border-tekmo-teal text-tekmo-teal hover:bg-tekmo-teal/10">
              Download our free IT Assessment Toolkit
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
