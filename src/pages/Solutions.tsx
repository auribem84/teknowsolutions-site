
import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, Shield, Settings, Code, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';

const ServiceModule = ({ 
  id, 
  title, 
  description, 
  capabilities, 
  successMetric, 
  companyName,
  icon: Icon,
  bgColor
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <section id={id} className="py-20 px-4 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <div className={`rounded-xl p-6 md:p-10 ${bgColor} mb-8`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-lg">
              <Icon size={32} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-2xl font-semibold mb-4">What We Do</h3>
            <p className="text-lg text-muted-foreground mb-8">{description}</p>
            
            <h3 className="text-2xl font-semibold mb-4">Key Capabilities</h3>
            <ul className="space-y-3 mb-6">
              {capabilities.map((capability, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check size={20} className="text-tekmo-teal mt-1 flex-shrink-0" />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-tekmo-teal to-tekmo-purple hover:from-tekmo-purple hover:to-tekmo-teal" asChild>
                <Link to={`/contact?service=${id}`}>
                  Learn More <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">
                  Request a Quote
                </Link>
              </Button>
            </div>
          </div>
          
          <div>
            <Card className="border-2 border-muted bg-muted/20 h-full">
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Customer Success Snapshot</h4>
                <div className="p-4 bg-white/90 dark:bg-gray-800/90 rounded-lg mb-4">
                  <p className="text-2xl font-bold text-tekmo-purple mb-2">{successMetric}</p>
                  <p className="text-sm text-muted-foreground">for {companyName}</p>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-between"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show Less" : "Show More Details"}
                  <ArrowRight size={16} className={`ml-2 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </Button>
                
                {isExpanded && (
                  <div className="mt-4 p-4 bg-muted rounded-lg animate-fade-in">
                    <h5 className="font-medium mb-2">How We Achieved This:</h5>
                    <ul className="space-y-2 text-sm">
                      <li>• Implemented redundant network paths</li>
                      <li>• Set up proactive monitoring</li>
                      <li>• Optimized hardware configurations</li>
                      <li>• Deployed automated recovery protocols</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const Solutions = () => {
  return (
    <>
      <Navbar />
      
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-tekmo-blue to-tekmo-blue/80 text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Expertise</h1>
          <p className="text-xl text-white/80 mb-10 max-w-3xl">
            End-to-end IT solutions for small & mid-size businesses.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            <ScrollLink
              to="infrastructure"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer transition-colors"
            >
              Infrastructure
            </ScrollLink>
            <ScrollLink
              to="cloud"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer transition-colors"
            >
              Cloud & DevOps
            </ScrollLink>
            <ScrollLink
              to="security"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer transition-colors"
            >
              Security & Compliance
            </ScrollLink>
            <ScrollLink
              to="automation"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer transition-colors"
            >
              Process Automation
            </ScrollLink>
            <ScrollLink
              to="development"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer transition-colors"
            >
              App Development
            </ScrollLink>
          </div>
        </div>
      </section>
      
      <ServiceModule
        id="infrastructure"
        title="Infrastructure"
        icon={Settings}
        bgColor="bg-gradient-to-r from-tekmo-teal to-tekmo-teal/70"
        description="We design, deploy, and manage your networks to maximize uptime and performance. Our infrastructure solutions provide the robust foundation your business needs to operate efficiently and scale confidently."
        capabilities={[
          "LAN/WAN design and implementation",
          "Virtualization & Hypervisor management",
          "High-availability clustering",
          "On-premise and hybrid server solutions",
          "Network monitoring and maintenance"
        ]}
        successMetric="Reduced network outages by 75%"
        companyName="Acme Corp"
      />
      
      <ServiceModule
        id="cloud"
        title="Cloud & DevOps"
        icon={Cloud}
        bgColor="bg-gradient-to-r from-tekmo-purple to-tekmo-purple/70"
        description="We help businesses migrate to, optimize, and manage cloud resources to reduce costs and increase agility. Our DevOps practices ensure your applications are built, deployed, and maintained with maximum efficiency."
        capabilities={[
          "Cloud migration strategy and execution",
          "AWS, Azure, and GCP expertise",
          "CI/CD pipeline implementation",
          "Infrastructure as Code (IaC)",
          "Containerization (Docker, Kubernetes)"
        ]}
        successMetric="Cut infrastructure costs by 40%"
        companyName="Global Shipping Inc."
      />
      
      <ServiceModule
        id="security"
        title="Security & Compliance"
        icon={Shield}
        bgColor="bg-gradient-to-r from-tekmo-orange to-tekmo-orange/70"
        description="We protect your digital assets, customer data, and reputation through comprehensive security solutions. Our compliance expertise helps you meet industry standards and navigate complex regulatory requirements."
        capabilities={[
          "Security assessments and penetration testing",
          "Compliance gap analysis (HIPAA, PCI, SOC2)",
          "Security policy development",
          "Authentication and access control",
          "Security monitoring and incident response"
        ]}
        successMetric="Achieved compliance in 45 days"
        companyName="HealthFirst Medical"
      />
      
      <ServiceModule
        id="automation"
        title="Process Automation"
        icon={Settings}
        bgColor="bg-gradient-to-r from-tekmo-pink to-tekmo-pink/70"
        description="We streamline your business operations by identifying and automating repetitive tasks. Our solutions free your team to focus on strategic initiatives while reducing errors and improving consistency."
        capabilities={[
          "Business process analysis and optimization",
          "Workflow automation implementation",
          "Robotic Process Automation (RPA)",
          "Integration between systems and applications",
          "Custom automation scripts and tools"
        ]}
        successMetric="Saved 120+ hours per month"
        companyName="Regional Bank Ltd."
      />
      
      <ServiceModule
        id="development"
        title="App Development"
        icon={Code}
        bgColor="bg-gradient-to-r from-tekmo-blue to-tekmo-blue/70"
        description="We create custom applications tailored to your specific business needs. From internal tools to customer-facing platforms, we build secure, scalable, and user-friendly solutions that drive growth."
        capabilities={[
          "Custom web and mobile application development",
          "User experience (UX) design",
          "API development and integration",
          "Legacy system modernization",
          "Application maintenance and support"
        ]}
        successMetric="Increased user engagement by 85%"
        companyName="RetailPlus Stores"
      />
      
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Cross-Service Benefits</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-white to-muted/50 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Integrated Solutions</h3>
                <p>Our services are designed to work together seamlessly, creating a cohesive IT ecosystem that maximizes efficiency and value.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-white to-muted/50 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Single Point of Contact</h3>
                <p>Eliminate vendor management headaches with our comprehensive approach to IT services and support.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-white to-muted/50 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Strategic Alignment</h3>
                <p>All our solutions are aligned with your business goals, ensuring technology drives your success rather than complicating it.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg mb-8">
              At Tekmowsolutions, we believe in the power of integrated IT. Our holistic approach means security is built into every cloud deployment, automation enhances your infrastructure, and your applications leverage the full potential of your technology stack. This single-vendor advantage eliminates communication gaps and ensures every component of your IT ecosystem works in harmony.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 bg-gradient-to-r from-tekmo-blue to-tekmo-purple text-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to transform your IT?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
            Take the first step toward more efficient, secure, and innovative technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-tekmo-purple hover:bg-white/90" asChild>
              <Link to="/get-started">
                Get Started <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/resources">
                <Download size={16} className="mr-2" /> Download Service Catalog
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <CTA />
      <Footer />
    </>
  );
};

export default Solutions;
