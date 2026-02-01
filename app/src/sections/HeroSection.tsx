import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background fade in + scale
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 0.9 }
      );

      // Headline words stagger
      const words = headlineRef.current?.querySelectorAll('.headline-word');
      if (words) {
        tl.fromTo(
          words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 },
          '-=0.5'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      // CTA + scroll hint
      tl.fromTo(
        [ctaRef.current, scrollHintRef.current],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven animation (pinned)
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([bgRef.current, headlineRef.current, subheadRef.current, ctaRef.current, scrollHintRef.current], {
              opacity: 1, x: 0, y: 0
            });
            gsap.set(overlayRef.current, { opacity: 0 });
          }
        },
      });

      // Phase 1 (0-30%): Subtle background scale, hold content
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1 },
        { scale: 1.02, ease: 'none' },
        0
      );

      // Phase 3 (70-100%): Exit animation
      // Diagonal wipe overlay
      scrollTl.fromTo(
        overlayRef.current,
        { x: '110vw', opacity: 1 },
        { x: '-10vw', ease: 'power2.in' },
        0.70
      );

      // Headline exit
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Subheadline exit
      scrollTl.fromTo(
        subheadRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // CTA exit
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Scroll hint exit
      scrollTl.fromTo(
        scrollHintRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned z-10 flex items-center justify-center"
    >
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <img
          src="./images/hero_bg.jpg"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-bg-primary/40 to-bg-primary/80" />
      </div>

      {/* Diagonal wipe overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-bg-primary z-20 pointer-events-none"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
          opacity: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4">
        {/* Headline */}
        <div
          ref={headlineRef}
          className="text-center will-change-transform"
        >
          <h1 className="font-display font-black text-text-primary leading-none tracking-tight">
            <span className="headline-word block text-[clamp(44px,8vw,84px)]">
              CRAFTING
            </span>
            <span className="headline-word block text-[clamp(44px,8vw,84px)] mt-2">
              DIGITAL{' '}
              <span className="text-accent-lime">EXPERIENCES</span>
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="mt-8 text-text-secondary text-lg md:text-xl max-w-2xl text-center will-change-transform"
        >
          Full-stack developer building modern web & mobile products.
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="absolute left-[4vw] bottom-[6vh] will-change-transform"
        >
          <button
            onClick={scrollToWork}
            className="group flex items-center gap-2 text-text-primary hover:text-accent-lime transition-colors"
          >
            <span className="font-mono text-sm uppercase tracking-wider">
              Explore my work
            </span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute right-[4vw] bottom-[6vh] flex items-center gap-2 will-change-transform"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 text-text-secondary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
