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
      gsap.fromTo(
        imageRef.current,
        { x: '-40px', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        headlineRef.current,
        { y: '-20px', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );

      const certs = certsRef.current?.querySelectorAll('.cert-card');
      if (certs) {
        gsap.fromTo(
          certs,
          { y: '30px', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const certifications = [
    {
      name: 'Tableau Desktop Specialist',
      platform: 'Tableau',
      year: '2024',
      description: 'Certified in data visualization and dashboard creation using Tableau.',
      url: 'https://drive.google.com/file/d/15AKl2suT_rrZgfdaqsYFrtFYAmPDOYNZ/view?usp=sharing',
    },
    {
      name: 'Digital Marketing',
      platform: 'Google',
      year: '2020',
      description: 'Comprehensive certification covering SEO, SEM, and digital analytics.',
      url: 'https://drive.google.com/file/d/1r0bCF-0CzXmyR8DV9HsCxL6aUXe5mHhX/view',
    },
    {
      name: 'Microsoft Certified: Azure Fundamentals',
      platform: 'Microsoft',
      year: '2022',
      description: 'Foundational knowledge of cloud concepts, core Azure services, and security/governance features.',
      url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative w-full bg-bg-secondary"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]">
        {/* Left image */}
        <div
          ref={imageRef}
          className="hidden lg:block relative h-screen overflow-hidden will-change-transform"
        >
          <img
            src="./images/certs_workspace.jpg"
            alt="Certifications"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-secondary/80" />
        </div>

        {/* Right panel */}
        <div
          ref={panelRef}
          className="bg-bg-secondary flex flex-col justify-center px-[4vw] py-16 min-h-screen lg:min-h-0"
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
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-text-secondary hover:text-accent-lime transition-colors"
                    aria-label={`View ${cert.name} certificate`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
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
      </div>
    </section>
  );
};

export default CertificationsSection;
