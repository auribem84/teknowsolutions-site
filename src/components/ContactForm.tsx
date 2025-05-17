
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(500, { message: "Description must be less than 500 characters." }),
  recaptcha: z.boolean().refine(val => val === true, { message: "Please confirm you are not a robot." }),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      description: "",
      recaptcha: false,
    },
  });

  function onSubmit(values: FormData) {
    console.log("Form submitted:", values);
    // In a real application, you would send this data to a backend server
    // which would then send an email to support@teknowsolutions.com
    // and verify the reCAPTCHA token.
    toast({
      title: "Form Submitted (Simulated)",
      description: "Your message has been logged to the console. Email sending requires backend setup.",
    });
    form.reset(); // Reset form after submission
  }

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-lg shadow-xl bg-white dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">Get in Touch</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        We're here to help and answer any question you might have.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#1EAEDB] focus:border-[#1EAEDB] dark:focus:ring-tekmo-teal dark:focus:border-tekmo-teal" />
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
                <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#1EAEDB] focus:border-[#1EAEDB] dark:focus:ring-tekmo-teal dark:focus:border-tekmo-teal" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Inquiry about..." {...field} className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#1EAEDB] focus:border-[#1EAEDB] dark:focus:ring-tekmo-teal dark:focus:border-tekmo-teal" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us more about your needs..." {...field} className="min-h-[120px] bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-[#1EAEDB] focus:border-[#1EAEDB] dark:focus:ring-tekmo-teal dark:focus:border-tekmo-teal" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recaptcha"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-[#1EAEDB] dark:data-[state=checked]:bg-tekmo-teal data-[state=checked]:text-white border-gray-400 dark:border-gray-500"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    I'm not a robot
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full bg-[#1EAEDB] hover:bg-[#1a9cb8] text-white dark:bg-tekmo-teal dark:hover:bg-tekmo-teal/90">
            Send Message <Send size={16} className="ml-2" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;

