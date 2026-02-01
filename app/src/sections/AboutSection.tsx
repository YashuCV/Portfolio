import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.4,
          },
        }
      );

      // Image animation with parallax
      gsap.fromTo(
        imageRef.current,
        { x: '10vw', scale: 0.98, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.4,
          },
        }
      );

      // Parallax on image
      gsap.fromTo(
        imageRef.current,
        { y: 40 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Body copy animation
      const bodyLines = bodyRef.current?.querySelectorAll('.body-line');
      if (bodyLines) {
        gsap.fromTo(
          bodyLines,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 0.4,
            },
          }
        );
      }

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.4,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-flowing z-20 bg-bg-primary min-h-screen flex items-center"
    >
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-[28vw] top-0 w-px h-full bg-text-primary/[0.06]" />
        <div className="absolute left-[52vw] top-0 w-px h-full bg-text-primary/[0.06]" />
        <div className="absolute left-[76vw] top-0 w-px h-full bg-text-primary/[0.06]" />
      </div>

      <div className="relative w-full px-[6vw] py-[10vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            {/* Headline */}
            <h2
              ref={headlineRef}
              className="font-display font-black text-[clamp(34px,5vw,56px)] text-text-primary mb-8 will-change-transform"
            >
              ABOUT <span className="text-accent-lime">ME</span>
            </h2>

            {/* Body copy */}
            <div ref={bodyRef} className="space-y-6 max-w-xl">
              <p className="body-line text-text-secondary text-base md:text-lg leading-relaxed">
                I'm a full-stack developer with a focus on scalable backends and clean, accessible frontends. I specialize in building production-grade applications that handle high-throughput data while maintaining exceptional user experiences.
              </p>
              <p className="body-line text-text-secondary text-base md:text-lg leading-relaxed">
                I've shipped production systems handling real-time data streams, built iOS apps from scratch using Swift and MVVM architecture, and led teams through complete product development cycles—from requirements gathering to App Store deployment.
              </p>
              <p className="body-line text-text-secondary text-base md:text-lg leading-relaxed">
                My experience spans across distributed systems, microservices, AI integrations, and mobile development. I'm passionate about creating technology that solves real problems and delivers measurable impact.
              </p>
            </div>

            {/* CTA row */}
            <div ref={ctaRef} className="mt-10 flex items-center gap-6 will-change-transform">
              <a
                href="mailto:yashwanthcveeranna@gmail.com?subject=Resume Request"
                className="group flex items-center gap-2 px-5 py-2.5 border border-accent-lime/60 text-accent-lime hover:bg-accent-lime hover:text-bg-primary transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                <span className="font-mono text-sm uppercase tracking-wider">
                  View Resume
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/yashwanth-veeranna-8b67121a7/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <span className="font-mono text-sm uppercase tracking-wider">
                  LinkedIn
                </span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative w-full max-w-md lg:max-w-lg will-change-transform"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="./images/about_portrait.jpg"
                  alt="Yashwanth"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Accent border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-accent-lime/30 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
