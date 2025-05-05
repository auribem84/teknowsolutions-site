
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { setupScrollAnimation } from '@/utils/scrollAnimation';
import { ArrowRight, Download, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const industriesData = [
  {
    id: 'retail',
    name: 'Retail',
    title: 'Retail IT Modernization Playbook',
    icon: '🛍️',
    summary: [
      'Assess legacy POS systems',
      'Design cloud-first inventory management',
      'Automate customer service workflows'
    ],
    fileSize: '4.2MB',
    caseStudy: 'National Retail Chain'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    title: 'Healthcare IT Security & Compliance',
    icon: '🏥',
    summary: [
      'HIPAA-compliant cloud migration',
      'Secure patient data management',
      'Telemedicine infrastructure setup'
    ],
    fileSize: '5.1MB',
    caseStudy: 'Regional Medical Center'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    title: 'Smart Factory IT Infrastructure',
    icon: '🏭',
    summary: [
      'IoT sensor network deployment',
      'Real-time production monitoring',
      'Predictive maintenance systems'
    ],
    fileSize: '3.8MB',
    caseStudy: 'Precision Parts Manufacturer'
  },
  {
    id: 'finance',
    name: 'Finance',
    title: 'Financial Services IT Security',
    icon: '💰',
    summary: [
      'Regulatory compliance frameworks',
      'Fraud detection systems',
      'Secure client portal development'
    ],
    fileSize: '4.5MB',
    caseStudy: 'Community Credit Union'
  },
  {
    id: 'education',
    name: 'Education',
    title: 'Education Technology Playbook',
    icon: '🎓',
    summary: [
      'Virtual classroom infrastructure',
      'Student data management systems',
      'Campus-wide network security'
    ],
    fileSize: '3.6MB',
    caseStudy: 'Charter School Network'
  },
  {
    id: 'nonprofit',
    name: 'Nonprofit',
    title: 'Nonprofit IT on a Budget',
    icon: '🤝',
    summary: [
      'Low-cost technology stack',
      'Donor management systems',
      'Remote collaboration tools'
    ],
    fileSize: '3.2MB',
    caseStudy: 'International Aid Organization'
  }
];

const Playbooks = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [playbooks, setPlaybooks] = useState(industriesData);

  useEffect(() => {
    // Setup scroll animations
    const cleanup = setupScrollAnimation();
    
    // Filter playbooks based on selected industry
    if (activeFilter === 'all') {
      setPlaybooks(industriesData);
    } else {
      setPlaybooks(industriesData.filter(industry => industry.id === activeFilter));
    }
    
    // Clean up event listener on component unmount
    return cleanup;
  }, [activeFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-tekmo-blue/10 to-tekmo-purple/10">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12 animated-on-scroll">
              <div className="flex items-center justify-center mb-4">
                <FileText className="text-tekmo-purple mr-2" size={24} />
                <h1 className="text-4xl md:text-6xl font-bold">Industry Playbooks</h1>
              </div>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                Actionable guides to help organizations across different sectors optimize their IT investments and drive digital transformation.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-8 px-4 border-b">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-wrap gap-2 justify-center animated-on-scroll">
              <Button 
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('all')}
                className={activeFilter === 'all' ? 'bg-tekmo-purple hover:bg-tekmo-purple/90' : ''}
              >
                All Industries
              </Button>
              {industriesData.map(industry => (
                <Button 
                  key={industry.id}
                  variant={activeFilter === industry.id ? 'default' : 'outline'}
                  onClick={() => setActiveFilter(industry.id)}
                  className={activeFilter === industry.id ? 'bg-tekmo-purple hover:bg-tekmo-purple/90' : ''}
                >
                  {industry.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Playbooks Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {playbooks.map((playbook) => (
                <div 
                  key={playbook.id} 
                  className="glass-effect rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 animated-on-scroll"
                >
                  <div className="p-6 border-b border-tekmo-purple/10">
                    <div className="text-4xl mb-4">{playbook.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-tekmo-purple">{playbook.title}</h3>
                    <ul className="mb-6 space-y-2">
                      {playbook.summary.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-tekmo-teal mr-2">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-tekmo-blue/5 to-tekmo-purple/5">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-foreground/60">{playbook.fileSize} PDF</span>
                      <span className="text-sm bg-tekmo-teal/10 text-tekmo-teal px-2 py-1 rounded-full">Free Download</span>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      <Button className="flex-1 bg-tekmo-purple hover:bg-tekmo-purple/90">
                        <Download size={16} className="mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Eye size={16} className="mr-2" />
                        Preview
                      </Button>
                    </div>
                    
                    <a href="#" className="text-sm flex items-center text-tekmo-teal hover:underline">
                      Case Study: {playbook.caseStudy}
                      <ArrowRight size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommendation Module */}
        <section className="py-16 px-4 bg-gradient-to-br from-tekmo-blue/10 to-tekmo-purple/10">
          <div className="container mx-auto max-w-5xl animated-on-scroll">
            <div className="glass-effect rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Find the Right Playbook for Your Business</h2>
              <p className="text-center mb-6">
                Answer a few quick questions to get personalized IT recommendations for your industry.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="space-y-4">
                  <h3 className="font-medium">What's your biggest IT challenge?</h3>
                  {['Security & Compliance', 'Legacy System Upgrade', 'Cloud Migration', 'Process Automation'].map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input type="radio" id={`challenge-${index}`} name="challenge" className="mr-2" />
                      <label htmlFor={`challenge-${index}`}>{option}</label>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">What's your company size?</h3>
                  {['1-10 employees', '11-50 employees', '51-200 employees', '201+ employees'].map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input type="radio" id={`size-${index}`} name="size" className="mr-2" />
                      <label htmlFor={`size-${index}`}>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button className="bg-gradient-to-r from-tekmo-teal to-tekmo-purple hover:from-tekmo-purple hover:to-tekmo-teal transition-all">
                  Get My Recommendation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Webinar Banner */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl animated-on-scroll">
            <div className="bg-gradient-to-r from-tekmo-teal/20 to-tekmo-purple/20 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">Deep Dive Webinar: IT Best Practices for Your Industry</h2>
              <p className="mb-6 max-w-2xl mx-auto">
                Join our experts for a live session exploring the latest IT trends and solutions specific to your business sector.
              </p>
              <Button className="bg-tekmo-purple hover:bg-tekmo-purple/90">
                Register Now
              </Button>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Playbooks;
