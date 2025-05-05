import { useState } from 'react';
import { Calendar as CalendarIcon, Check, ArrowRight, MessageCircle, Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  goals: z.array(z.string()).min(1, "Please select at least one goal"),
  path: z.string().min(1, "Please select a path"),
  date: z.date().optional(),
});

const GetStarted = () => {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      goals: [],
      path: "",
      date: undefined,
    },
  });
  
  const onSubmit = (data) => {
    toast({
      title: "Success!",
      description: "We've received your information. Expect our call within 24 hours.",
    });
    console.log("Form submitted:", data);
  };
  
  const handleGoalSelection = (goal: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(goal)) {
        return prev.filter(g => g !== goal);
      } else {
        return [...prev, goal];
      }
    });
    
    const currentGoals = form.getValues("goals");
    if (currentGoals.includes(goal)) {
      form.setValue("goals", currentGoals.filter(g => g !== goal));
    } else {
      form.setValue("goals", [...currentGoals, goal]);
    }
  };
  
  const handlePathSelection = (path: string) => {
    setSelectedPath(path);
    form.setValue("path", path);
  };
  
  const handleDateSelection = (date: Date | undefined) => {
    setSelectedDate(date);
    form.setValue("date", date);
  };
  
  const nextStep = () => {
    if (step === 1 && selectedGoals.length === 0) {
      toast({
        title: "Please select at least one goal",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2) {
      const { name, company, email } = form.getValues();
      if (!name || !company || !email) {
        toast({
          title: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (step === 3 && !selectedPath) {
      toast({
        title: "Please select a path",
        variant: "destructive",
      });
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  return (
    <>
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Kick Off Your IT Transformation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No commitment. No jargon. Just clear next steps to better technology solutions.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 mb-12">
            <div className="flex justify-between mb-8 relative">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center relative z-10">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                      s === step ? 'bg-tekmo-purple animate-pulse' : 
                      s < step ? 'bg-tekmo-teal' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    {s < step ? <Check size={18} /> : s}
                  </div>
                  <div className="text-xs mt-2 text-center">
                    {s === 1 ? "Goals" : 
                     s === 2 ? "About You" : 
                     s === 3 ? "Pick Path" : "Schedule"}
                  </div>
                </div>
              ))}
              
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -z-0" />
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-semibold mb-4">Choose Your Goal</h2>
                    <p className="text-muted-foreground mb-6">What are you looking to achieve? Select all that apply.</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {["Migrate to Cloud", "Harden Security", "Automate Processes", "Build an App"].map((goal) => (
                        <Card 
                          key={goal} 
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedGoals.includes(goal) ? 'border-2 border-tekmo-purple bg-tekmo-purple/5' : ''
                          }`}
                          onClick={() => handleGoalSelection(goal)}
                        >
                          <CardContent className="p-4 flex items-center gap-3">
                            <div className={`w-5 h-5 rounded flex items-center justify-center ${
                              selectedGoals.includes(goal) ? 'bg-tekmo-purple text-white' : 'border border-gray-300'
                            }`}>
                              {selectedGoals.includes(goal) && <Check size={12} />}
                            </div>
                            <span>{goal}</span>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-semibold mb-4">Tell Us About You</h2>
                    <p className="text-muted-foreground mb-6">We need a few details to get started.</p>
                    
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Corp" {...field} />
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
                            <FormLabel>Business Email*</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@company.com" {...field} />
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
                              <Input placeholder="+1 234 567 8900" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-semibold mb-4">Pick Your Path</h2>
                    <p className="text-muted-foreground mb-6">Based on your goals, we recommend the following options:</p>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      {["Free IT Audit", "Proof-of-Concept", "Strategy Workshop"].map((path) => (
                        <Card 
                          key={path} 
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedPath === path ? 'border-2 border-tekmo-purple bg-tekmo-purple/5' : ''
                          }`}
                          onClick={() => handlePathSelection(path)}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">{path}</h3>
                              <div className={`w-4 h-4 rounded-full ${
                                selectedPath === path ? 'bg-tekmo-purple' : 'border border-gray-300'
                              }`}></div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {path === "Free IT Audit" ? "30-min technical review" : 
                               path === "Proof-of-Concept" ? "Mini pilot engagement" : 
                               "Full-day planning session"}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {step === 4 && (
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-semibold mb-4">Schedule Your Session</h2>
                    <p className="text-muted-foreground mb-6">Choose a date and time that works for you — we'll call you.</p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <Card>
                        <CardContent className="p-4">
                          <CalendarComponent
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelection}
                            disabled={{ before: new Date() }}
                            className="rounded-md border"
                          />
                        </CardContent>
                      </Card>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Available Time Slots</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map((time) => (
                            <Button 
                              key={time}
                              variant="outline" 
                              className={selectedDate ? "" : "opacity-50 cursor-not-allowed"}
                              disabled={!selectedDate}
                              onClick={() => {
                                if (selectedDate) {
                                  toast({
                                    title: "Time slot selected",
                                    description: `Your session is scheduled for ${time} on ${selectedDate.toLocaleDateString()}`,
                                  });
                                }
                              }}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                  )}
                  
                  {step < 4 ? (
                    <Button type="button" className="ml-auto" onClick={nextStep}>
                      Continue
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="ml-auto bg-gradient-to-r from-tekmo-teal to-tekmo-purple"
                    >
                      Get Started
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-tekmo-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon size={24} className="text-tekmo-teal" />
                </div>
                <h3 className="font-medium mb-2">We Call You</h3>
                <p className="text-sm text-muted-foreground">We'll reach out at your scheduled time to discuss your needs.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-tekmo-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-tekmo-purple" />
                </div>
                <h3 className="font-medium mb-2">We Audit & Report</h3>
                <p className="text-sm text-muted-foreground">Our experts assess your current IT setup and identify opportunities.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-tekmo-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight size={24} className="text-tekmo-orange" />
                </div>
                <h3 className="font-medium mb-2">You Get a Clear Roadmap</h3>
                <p className="text-sm text-muted-foreground">We provide actionable steps to transform your technology.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-muted/20 rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Instant Access</h2>
            <p className="max-w-2xl mx-auto mb-6">Not ready to schedule? Get valuable resources right now.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-tekmo-teal to-tekmo-purple">
                <Download size={16} className="mr-2" /> Download IT Readiness Checklist
              </Button>
              
              <Button variant="outline" className="group">
                <MessageCircle size={16} className="mr-2 group-hover:text-tekmo-teal transition-colors" /> 
                Ask TekmoBot for Help
              </Button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                Absolutely free—no credit card required.
              </p>
              <p className="text-sm text-muted-foreground">
                Expect our call within 24 hours of scheduling.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default GetStarted;
