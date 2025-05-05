
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

const CTA = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-tekmo-blue to-tekmo-purple text-white">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your IT?</h2>
        <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
          Start your journey to more efficient, secure, and innovative IT solutions with Tekmowsolutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-tekmo-teal to-tekmo-purple hover:from-tekmo-purple hover:to-tekmo-teal transition-all">
            <Calendar size={16} className="mr-2" />
            Schedule a Free Consultation
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            Start Your Free Audit <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
