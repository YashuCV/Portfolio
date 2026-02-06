import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
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
        [scrollHintRef.current],
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
            gsap.set([bgRef.current, headlineRef.current, subheadRef.current, scrollHintRef.current], {
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
        scrollHintRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

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
          src="./images/hero_3d.png"
          alt="Hero background 3D"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/55 via-bg-primary/35 to-bg-primary/85" />
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
        {/* No overlay headline text – the 3D image carries the titles */}
        <div
          ref={headlineRef}
          className="text-center will-change-transform"
        />

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="absolute bottom-[6vh] left-1/2 -translate-x-1/2 px-4 text-text-secondary text-base md:text-lg font-mono uppercase tracking-wider text-center will-change-transform"
        >
          Building Scalable Solutions for Modern Challenges
        </p>

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
