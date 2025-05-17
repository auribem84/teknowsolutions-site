
import { Book, Users } from 'lucide-react'; // Icons for About section

// Data for About section
const leadershipTeam = [
  {
    name: "Sarah Johnson",
    title: "CEO & Founder",
    bio: "With 15+ years in enterprise IT, Sarah leads our strategic vision and client relationships.",
    imageColor: "bg-gradient-to-br from-tekmo-teal/70 to-tekmo-purple/70" // tekmo
  },
  {
    name: "Michael Chen",
    title: "CTO",
    bio: "Michael brings deep technical expertise in cloud architecture and security from his work at Microsoft and AWS.",
    imageColor: "bg-gradient-to-br from-tekmo-orange/70 to-tekmo-purple/70" // tekmo
  },
  {
    name: "Priya Patel",
    title: "COO",
    bio: "Priya oversees our delivery operations, ensuring every client receives exceptional service and results.",
    imageColor: "bg-gradient-to-br from-tekmo-pink/70 to-tekmo-teal/70" // tekmo
  }
];

const coreValues = [
  {
    title: "Client Partnership",
    description: "We see ourselves as an extension of your team, fully invested in your success."
  },
  {
    title: "Technical Excellence",
    description: "We maintain rigorous standards and stay at the forefront of emerging technologies."
  },
  {
    title: "Transparent Communication",
    description: "Clear, honest dialogue is the foundation of every client relationship."
  },
  {
    title: "Continuous Innovation",
    description: "We constantly explore new ways to deliver more value and better outcomes."
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="scroll-mt-20">
      {/* Our Story Section */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animated-on-scroll">
              <div className="flex items-center mb-4">
                <Book className="text-tekmo-teal mr-2" size={24} /> {/* tekmo */}
                <h2 className="text-3xl font-bold">Our Story</h2>
              </div>
              <p className="text-lg mb-4">
                Founded in 2018, Teknowsolutions was born from a vision to democratize enterprise-grade IT solutions for smaller businesses.
              </p>
              <p className="text-lg mb-4">
                Our founders recognized that while small and mid-size businesses face many of the same technical challenges as large enterprises, they often lack the resources and expertise to address them effectively.
              </p>
              <p className="text-lg">
                Since then, we've grown to serve over 200 clients across various industries, helping them leverage technology to drive growth, efficiency, and innovation.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl animated-on-scroll">
              <div className="aspect-video bg-gradient-to-br from-tekmo-teal to-tekmo-purple flex items-center justify-center text-white"> {/* tekmo */}
                <span className="text-lg font-medium">Company Timeline Video Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Leadership Section */}
      <div className="py-16 px-4 bg-gradient-to-br from-tekmo-blue/5 to-tekmo-purple/5"> {/* tekmo */}
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 animated-on-scroll">
            <div className="flex items-center justify-center mb-4">
              <Users className="text-tekmo-purple mr-2" size={24} /> {/* tekmo */}
              <h2 className="text-3xl font-bold">Our Leadership</h2>
            </div>
            <p className="text-lg max-w-3xl mx-auto">
              Meet the experienced team driving Teknowsolutions' innovation and client success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((leader, index) => (
              <div key={index} className="glass-effect rounded-lg p-6 hover:scale-105 transition-transform duration-300 animated-on-scroll">
                <div className={`w-24 h-24 rounded-full mx-auto mb-4 ${leader.imageColor} flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">{leader.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                <p className="text-tekmo-purple font-medium mb-3">{leader.title}</p> {/* tekmo */}
                <p className="text-foreground/80">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 animated-on-scroll">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg max-w-3xl mx-auto">
              The principles that guide how we work and deliver value to our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="border border-tekmo-teal/20 rounded-lg p-6 animated-on-scroll"> {/* tekmo */}
                <h3 className="text-xl font-bold mb-3 text-tekmo-teal">{value.title}</h3> {/* tekmo */}
                <p className="text-foreground/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

