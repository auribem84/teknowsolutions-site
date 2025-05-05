
export const setupScrollAnimation = () => {
  // Function to handle element animation on scroll
  const handleScrollAnimation = () => {
    const elements = document.querySelectorAll('.animated-on-scroll');
    
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight * 0.85;
      
      if (elementPosition < screenPosition) {
        element.classList.add('show');
      }
    });
  };
  
  // Initial check for elements in view
  handleScrollAnimation();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScrollAnimation);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScrollAnimation);
  };
};
