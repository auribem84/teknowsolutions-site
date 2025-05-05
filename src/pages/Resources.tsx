
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { setupScrollAnimation } from '@/utils/scrollAnimation';
import { ArrowRight, Calendar, Clock, Newspaper, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample blog posts data
const blogPostsData = [
  {
    id: 1,
    title: "5 Ways to Strengthen Your Cloud Security Posture",
    excerpt: "As organizations continue to migrate to the cloud, maintaining a strong security posture becomes increasingly important...",
    category: "Security",
    date: "May 1, 2025",
    image: "bg-gradient-to-br from-tekmo-purple/70 to-tekmo-blue/70"
  },
  {
    id: 2,
    title: "Automating Business Processes: A Step-by-Step Guide",
    excerpt: "Process automation can significantly reduce operational costs and improve efficiency. This guide walks you through identifying...",
    category: "Automation",
    date: "April 22, 2025",
    image: "bg-gradient-to-br from-tekmo-orange/70 to-tekmo-teal/70"
  },
  {
    id: 3,
    title: "The Ultimate Cloud Migration Checklist for SMBs",
    excerpt: "Moving your infrastructure to the cloud requires careful planning. Our comprehensive checklist ensures you don't miss any critical steps...",
    category: "Cloud",
    date: "April 15, 2025",
    image: "bg-gradient-to-br from-tekmo-teal/70 to-tekmo-purple/70"
  },
  {
    id: 4,
    title: "How to Implement Zero Trust Security in Your Organization",
    excerpt: "Zero Trust is more than a buzzword—it's a comprehensive security approach that assumes no user or system is inherently trusted...",
    category: "Security",
    date: "April 8, 2025",
    image: "bg-gradient-to-br from-tekmo-pink/70 to-tekmo-blue/70"
  },
  {
    id: 5,
    title: "Building a Scalable IT Infrastructure for Growing Businesses",
    excerpt: "As your business grows, your IT infrastructure needs to scale accordingly. Learn how to design systems that can grow with you...",
    category: "Infrastructure",
    date: "March 30, 2025",
    image: "bg-gradient-to-br from-tekmo-blue/70 to-tekmo-orange/70"
  },
  {
    id: 6,
    title: "The ROI of Custom Application Development",
    excerpt: "Investing in custom applications can provide significant returns. We break down the costs and benefits to help you make informed decisions...",
    category: "App Development",
    date: "March 25, 2025",
    image: "bg-gradient-to-br from-tekmo-teal/70 to-tekmo-pink/70"
  }
];

// Sample case studies data
const caseStudiesData = [
  {
    id: 1,
    client: "Regional Healthcare Provider",
    industry: "Healthcare",
    challenge: "Legacy systems hindering patient care efficiency",
    solution: "Cloud migration & process automation",
    result: "+40% in appointment scheduling efficiency",
    logo: "🏥"
  },
  {
    id: 2,
    client: "National Retail Chain",
    industry: "Retail",
    challenge: "Fragmented inventory management across 50+ locations",
    solution: "Custom inventory system with real-time tracking",
    result: "99.8% inventory accuracy, up from 92%",
    logo: "🛍️"
  },
  {
    id: 3,
    client: "Manufacturing Company",
    industry: "Manufacturing",
    challenge: "Production delays due to manual quality control",
    solution: "IoT-powered automated quality monitoring",
    result: "35% reduction in defect rates",
    logo: "🏭"
  },
  {
    id: 4,
    client: "Financial Services Firm",
    industry: "Finance",
    challenge: "Rising cybersecurity threats and regulatory requirements",
    solution: "Comprehensive security infrastructure overhaul",
    result: "0 security incidents following implementation",
    logo: "💰"
  },
  {
    id: 5,
    client: "Educational Institution",
    industry: "Education",
    challenge: "Remote learning limitations during pandemic",
    solution: "Virtual classroom environment & learning management system",
    result: "98% student engagement rate, up from 65%",
    logo: "🎓"
  },
  {
    id: 6,
    client: "Nonprofit Organization",
    industry: "Nonprofit",
    challenge: "Limited resources for technology investments",
    solution: "Cloud-based CRM & volunteer management system",
    result: "43% increase in fundraising efficiency",
    logo: "🤝"
  }
];

// Sample webinars data
const webinarsData = {
  upcoming: [
    {
      id: 1,
      title: "Cloud Migration Strategies for Mid-Size Businesses",
      date: "June 15, 2025",
      time: "11:00 AM ET",
      duration: "60 minutes",
      presenters: "Sarah Johnson, CTO & Michael Chen, Cloud Architect",
      image: "bg-gradient-to-br from-tekmo-blue/70 to-tekmo-purple/70"
    },
    {
      id: 2,
      title: "Security Best Practices in a Hybrid Work Environment",
      date: "June 22, 2025",
      time: "2:00 PM ET",
      duration: "45 minutes",
      presenters: "Priya Patel, Security Lead",
      image: "bg-gradient-to-br from-tekmo-teal/70 to-tekmo-orange/70"
    }
  ],
  onDemand: [
    {
      id: 1,
      title: "Automating Your Business: From Basics to Advanced Workflows",
      date: "Originally aired: May 10, 2025",
      duration: "55 minutes",
      views: "1,243 views",
      image: "bg-gradient-to-br from-tekmo-purple/70 to-tekmo-teal/70"
    },
    {
      id: 2,
      title: "The Complete Guide to IT Infrastructure Modernization",
      date: "Originally aired: April 12, 2025",
      duration: "65 minutes",
      views: "876 views",
      image: "bg-gradient-to-br from-tekmo-orange/70 to-tekmo-blue/70"
    },
    {
      id: 3,
      title: "Custom App Development: Building Solutions That Scale",
      date: "Originally aired: March 15, 2025",
      duration: "50 minutes",
      views: "1,592 views",
      image: "bg-gradient-to-br from-tekmo-teal/70 to-tekmo-pink/70"
    }
  ]
};

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(blogPostsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [filteredCaseStudies, setFilteredCaseStudies] = useState(caseStudiesData);

  useEffect(() => {
    // Setup scroll animations
    const cleanup = setupScrollAnimation();
    
    // Filter blog posts based on category and search term
    let filtered = blogPostsData;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(post => post.category.toLowerCase() === activeCategory.toLowerCase());
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPosts(filtered);
    
    // Filter case studies based on industry
    if (activeIndustry === 'all') {
      setFilteredCaseStudies(caseStudiesData);
    } else {
      setFilteredCaseStudies(caseStudiesData.filter(study => 
        study.industry.toLowerCase() === activeIndustry.toLowerCase()
      ));
    }
    
    // Clean up event listener on component unmount
    return cleanup;
  }, [activeCategory, searchTerm, activeIndustry]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-tekmo-blue/10 to-tekmo-purple/10">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12 animated-on-scroll">
              <div className="flex items-center justify-center mb-4">
                <Newspaper className="text-tekmo-purple mr-2" size={24} />
                <h1 className="text-4xl md:text-6xl font-bold">Resources</h1>
              </div>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                Discover insights, best practices, and success stories to guide your IT transformation journey.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center justify-between mb-8 animated-on-scroll">
              <h2 className="text-3xl font-bold">Blog</h2>
              <a href="#" className="text-tekmo-teal hover:underline flex items-center">
                View All Articles
                <ArrowRight size={16} className="ml-1" />
              </a>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 animated-on-scroll">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={activeCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setActiveCategory('all')}
                  className={activeCategory === 'all' ? 'bg-tekmo-purple hover:bg-tekmo-purple/90' : ''}
                >
                  All
                </Button>
                {['Cloud', 'Security', 'Automation', 'Infrastructure', 'App Development'].map((category) => (
                  <Button 
                    key={category}
                    variant={activeCategory === category.toLowerCase() ? 'default' : 'outline'}
                    onClick={() => setActiveCategory(category.toLowerCase())}
                    className={activeCategory === category.toLowerCase() ? 'bg-tekmo-purple hover:bg-tekmo-purple/90' : ''}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Featured Article */}
            {filteredPosts.length > 0 && (
              <div className="mb-12 animated-on-scroll">
                <div className="glass-effect rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className={`aspect-video ${filteredPosts[0].image} flex items-center justify-center text-white text-xl font-bold p-10 text-center`}>
                      Featured Article
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-tekmo-purple/10 text-tekmo-purple px-2 py-1 rounded-full text-sm">
                          {filteredPosts[0].category}
                        </span>
                        <span className="text-sm text-foreground/60">{filteredPosts[0].date}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{filteredPosts[0].title}</h3>
                      <p className="mb-6 text-foreground/80">{filteredPosts[0].excerpt}</p>
                      <Button>Read Article</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <div key={post.id} className="glass-effect rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 animated-on-scroll">
                  <div className={`aspect-video ${post.image} flex items-center justify-center`}></div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-tekmo-purple/10 text-tekmo-purple px-2 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                      <span className="text-sm text-foreground/60">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <p className="mb-4 text-foreground/80 line-clamp-3">{post.excerpt}</p>
                    <a href="#" className="text-tekmo-teal hover:underline flex items-center text-sm">
                      Read More
                      <ArrowRight size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 animated-on-scroll">
                <p className="text-xl text-foreground/60">No articles found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchTerm('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-tekmo-blue/5 to-tekmo-purple/5">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-8 animated-on-scroll">
              <h2 className="text-3xl font-bold mb-3">Case Studies</h2>
              <p className="text-lg text-foreground/80">
                Real-world success with Tekmowsolutions. See how we've driven ROI, cut costs, and secured environments for businesses like yours.
              </p>
            </div>

            {/* Industry Filter */}
            <div className="flex flex-wrap gap-2 mb-8 animated-on-scroll">
              <Button 
                variant={activeIndustry === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveIndustry('all')}
                className={activeIndustry === 'all' ? 'bg-tekmo-purple hover:bg-tekmo-purple/90' : ''}
              >
                All Industries
              </Button>
              {['Healthcare', 'Retail', 'Manufacturing', 'Finance', 'Education', 'Nonprofit'].map((industry) => (
                <Button 
                  key={industry}
                  variant={activeIndustry === industry.toLowerCase() ? 'default' : 'outline'}
                  onClick={() => setActiveIndustry(industry.toLowerCase())}
                  className={activeIndustry === industry.toLowerCase() ? 'bg-tekmo-purple hover:bg-tekmo-purple/90' : ''}
                >
                  {industry}
                </Button>
              ))}
            </div>

            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((study) => (
                <div key={study.id} className="glass-effect rounded-lg p-6 hover:shadow-lg transition-all duration-300 animated-on-scroll">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{study.logo}</div>
                    <div>
                      <h3 className="font-bold">{study.client}</h3>
                      <p className="text-sm text-tekmo-purple">{study.industry}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-foreground/60 mb-1">Challenge:</p>
                    <p className="mb-3">{study.challenge}</p>
                    
                    <p className="text-sm text-foreground/60 mb-1">Solution:</p>
                    <p className="mb-3">{study.solution}</p>
                    
                    <div className="bg-tekmo-teal/10 text-tekmo-teal px-3 py-2 rounded font-medium text-center mb-4">
                      Result: {study.result}
                    </div>
                  </div>
                  
                  <Button className="w-full">Read Full Case Study</Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Webinars Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-8 animated-on-scroll">
              <h2 className="text-3xl font-bold mb-3">Webinars</h2>
              <p className="text-lg text-foreground/80">
                Join our expert-led sessions covering the latest IT trends, best practices, and strategic insights.
              </p>
            </div>

            <Tabs defaultValue="upcoming" className="animated-on-scroll">
              <TabsList className="mb-8">
                <TabsTrigger value="upcoming">Upcoming Webinars</TabsTrigger>
                <TabsTrigger value="ondemand">On-Demand Webinars</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {webinarsData.upcoming.map((webinar) => (
                    <div key={webinar.id} className="glass-effect rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className={`aspect-video ${webinar.image} p-6 flex flex-col justify-end`}>
                        <div className="bg-white/90 dark:bg-tekmo-blue/90 text-foreground rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar size={16} className="text-tekmo-purple" />
                            <span className="text-sm font-medium">{webinar.date} • {webinar.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-tekmo-teal" />
                            <span className="text-sm">{webinar.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3">{webinar.title}</h3>
                        <p className="mb-4 text-foreground/80">
                          Presented by: {webinar.presenters}
                        </p>
                        <div className="flex gap-3">
                          <Button className="flex-1 bg-tekmo-purple hover:bg-tekmo-purple/90">
                            Register Now
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Add to Calendar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="ondemand">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {webinarsData.onDemand.map((webinar) => (
                    <div key={webinar.id} className="glass-effect rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className={`aspect-video ${webinar.image} relative flex items-center justify-center`}>
                        <div className="w-16 h-16 bg-white/90 dark:bg-tekmo-blue/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-tekmo-purple border-b-8 border-b-transparent ml-1"></div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-3">{webinar.title}</h3>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-foreground/60">{webinar.date}</span>
                          <span className="text-sm text-foreground/60">{webinar.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-tekmo-teal">{webinar.views}</span>
                          <Button variant="outline" size="sm">
                            Watch Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <CTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
