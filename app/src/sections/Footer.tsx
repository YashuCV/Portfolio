import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.4,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-[90] bg-bg-secondary py-12"
    >
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-text-primary/10" />

      <div
        ref={contentRef}
        className="px-[6vw] will-change-transform"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-text-primary">
              YASHWANTH
            </span>
            <span className="text-text-secondary/40">|</span>
            <span className="font-mono text-sm text-text-secondary/60">
              © 2026
            </span>
          </div>

          {/* Center - quick links */}
          <div className="flex items-center gap-6">
            <a
              href="#hero"
              className="text-text-secondary/60 hover:text-accent-lime text-sm transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-text-secondary/60 hover:text-accent-lime text-sm transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-text-secondary/60 hover:text-accent-lime text-sm transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-text-secondary/60 hover:text-accent-lime text-sm transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 text-text-secondary/60 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-accent-lime fill-accent-lime" />
            <span>Thanks for visiting.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
