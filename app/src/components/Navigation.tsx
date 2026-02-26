import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DURATION = 1;
const EASE = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // easeInOutCubic

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) {
      setIsMobileMenuOpen(false);
      return;
    }

    if (scrollRafRef.current != null) {
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
      ScrollTrigger.getAll().forEach((st) => st.enable());
      ScrollTrigger.refresh();
    }

    const startY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = Math.min(
      Math.max(0, section.getBoundingClientRect().top + startY - 80),
      docHeight
    );
    const distance = Math.abs(targetY - startY);
    const duration = Math.min(DURATION, 0.4 + (distance / 1200) * 0.6);

    const startTime = performance.now();

    ScrollTrigger.getAll().forEach((st) => st.disable());
    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const t = Math.min(elapsed / duration, 1);
      const eased = EASE(t);
      const currentY = startY + (targetY - startY) * eased;
      window.scrollTo(0, currentY);

      if (t < 1) {
        scrollRafRef.current = requestAnimationFrame(tick);
      } else {
        scrollRafRef.current = null;
        ScrollTrigger.getAll().forEach((st) => st.enable());
        ScrollTrigger.refresh();
      }
    };

    scrollRafRef.current = requestAnimationFrame(tick);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Education', id: 'education' },
    { label: 'Work Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Certifications', id: 'certifications' },
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
            onClick={() => scrollToSection('about')}
            className="font-display font-bold text-text-primary hover:text-accent-lime transition-colors text-3d"
          >
            Yashwanth Veeranna
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
