import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const entriesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=125%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Phase 1: ENTRANCE (0% - 30%)
      // Left image slides in
      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Right panel slides in
      scrollTl.fromTo(
        panelRef.current,
        { x: '45vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Headline drops in
      scrollTl.fromTo(
        headlineRef.current,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      // Entries stagger in
      const entries = entriesRef.current?.querySelectorAll('.edu-entry');
      if (entries) {
        scrollTl.fromTo(
          entries,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, ease: 'power2.out' },
          0.1
        );
      }

      // Phase 3: EXIT (70% - 100%)
      // Image exits left
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Panel exits right
      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Headline exits up
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Entries exit up
      if (entries) {
        scrollTl.fromTo(
          entries,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, stagger: 0.03, ease: 'power2.in' },
          0.74
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const educationData = [
    {
      degree: 'MS in Computer Science',
      school: 'Oklahoma State University',
      duration: '2024 – 2025',
      detail: 'GPA: 3.7',
      icon: Award,
    },
    {
      degree: 'BTech in Electrical & Electronics Engineering',
      school: 'National Institute of Technology, Karnataka',
      duration: '2018 – 2022',
      detail: '',
      icon: GraduationCap,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="education"
      className="section-pinned z-30 bg-bg-secondary"
    >
      {/* Left image */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[55vw] h-full will-change-transform"
      >
        <img
          src="./images/edu_classroom.jpg"
          alt="Education"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-secondary/80" />
      </div>

      {/* Right panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 w-[45vw] h-full bg-bg-secondary flex flex-col justify-center px-[4vw] will-change-transform"
      >
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display font-black text-[clamp(34px,4vw,56px)] text-text-primary mb-12 will-change-transform"
        >
          EDU<span className="text-accent-lime">CATION</span>
        </h2>

        {/* Entries */}
        <div ref={entriesRef} className="space-y-10">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="edu-entry group relative pl-6 border-l-2 border-text-primary/20 hover:border-accent-lime/60 transition-colors will-change-transform"
            >
              {/* Pulsing line decoration */}
              <div className="absolute left-0 top-0 w-px h-full bg-accent-lime/30 animate-pulse-line opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-text-primary/5 rounded">
                  <edu.icon className="w-5 h-5 text-accent-lime" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-text-primary mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-text-secondary text-base mb-2">
                    {edu.school}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-text-secondary/70 font-mono text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.duration}
                    </span>
                    {edu.detail && (
                      <span className="text-accent-lime font-mono text-sm">
                        {edu.detail}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative element */}
        <div className="mt-16 flex items-center gap-2">
          <div className="w-12 h-px bg-accent-lime/40" />
          <span className="font-mono text-xs text-text-secondary/50 uppercase tracking-wider">
            Academic Excellence
          </span>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
