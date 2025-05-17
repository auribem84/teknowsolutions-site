
import ContactForm from "./ContactForm"; // Import the new contact form

const CTA = () => {
  return (
    <section 
      id="contact" 
      className="py-20 px-4 scroll-mt-20"
      style={{ backgroundColor: '#D6BCFA' }} // Using Light Purple as background
    >
      <div className="container mx-auto max-w-5xl text-center">
        {/* The old content is removed and replaced by the ContactForm component */}
        <ContactForm />
      </div>
    </section>
  );
};

export default CTA;
