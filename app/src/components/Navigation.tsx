import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Work', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Main navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled
            ? 'bg-bg-primary/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="px-[4vw] flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="font-display font-bold text-text-primary hover:text-accent-lime transition-colors"
          >
            YASHWANTH
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-mono text-sm text-text-secondary hover:text-text-primary transition-colors uppercase tracking-wider"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-primary"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-bg-primary/98 backdrop-blur-lg transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-display font-bold text-3xl text-text-primary hover:text-accent-lime transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
