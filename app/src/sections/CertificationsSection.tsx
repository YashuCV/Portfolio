import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Phase 1: ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: '45vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      const certs = certsRef.current?.querySelectorAll('.cert-card');
      if (certs) {
        scrollTl.fromTo(
          certs,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, ease: 'power2.out' },
          0.1
        );
      }

      // Phase 3: EXIT (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      if (certs) {
        scrollTl.fromTo(
          certs,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, stagger: 0.03, ease: 'power2.in' },
          0.74
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const certifications = [
    {
      name: 'Tableau Desktop Specialist',
      platform: 'Tableau',
      year: '2023',
      description: 'Certified in data visualization and dashboard creation using Tableau.',
    },
    {
      name: 'Digital Marketing',
      platform: 'Google',
      year: '2022',
      description: 'Comprehensive certification covering SEO, SEM, and digital analytics.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="section-pinned z-[70] bg-bg-secondary"
    >
      {/* Left image */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[55vw] h-full will-change-transform"
      >
        <img
          src="/images/certs_workspace.jpg"
          alt="Certifications"
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
          className="font-display font-black text-[clamp(34px,4vw,56px)] text-text-primary mb-10 will-change-transform"
        >
          CERTIFI<span className="text-accent-lime">CATIONS</span>
        </h2>

        {/* Certification cards */}
        <div ref={certsRef} className="space-y-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="cert-card glass-card p-6 hover:-translate-y-1 transition-transform duration-300 will-change-transform"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-lime/10 rounded">
                  <Award className="w-6 h-6 text-accent-lime" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg text-text-primary mb-1">
                    {cert.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-text-secondary text-sm">
                      {cert.platform}
                    </span>
                    <span className="w-1 h-1 bg-text-secondary/40 rounded-full" />
                    <span className="font-mono text-xs text-accent-lime">
                      {cert.year}
                    </span>
                  </div>
                  <p className="text-text-secondary/70 text-sm">
                    {cert.description}
                  </p>
                </div>
                <button className="p-2 text-text-secondary hover:text-accent-lime transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative */}
        <div className="mt-10 flex items-center gap-3">
          <div className="w-8 h-px bg-accent-lime/40" />
          <span className="font-mono text-xs text-text-secondary/50 uppercase tracking-wider">
            Continuous Learning
          </span>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
