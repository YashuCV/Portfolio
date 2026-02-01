import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, ChevronDown, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { x: '-6vw', opacity: 0 },
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
        { x: '10vw', opacity: 0 },
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

      gsap.fromTo(
        imageRef.current,
        { y: 30 },
        {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.exp-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { x: '-8vw', opacity: 0, rotate: -1 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 20%',
              scrub: 0.4,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const experienceData = [
    {
      role: 'Full-Stack Developer',
      company: 'Oklahoma State University',
      location: 'Stillwater, OK',
      duration: 'April 2025 – Dec 2025',
      highlights: [
        'Built production-grade Swift iOS app (MVVM), owning architecture → API design → deployment to TestFlight/App Store for Burn & BCC',
        'Integrated weather and geospatial mapping APIs into Spring Boot backend workflows, enabling real-time decision logic with sub-second response times',
        'Implemented secure API layers using OAuth2, JWT, and Spring Security, applying OWASP best practices',
        'Resolved 20+ production bugs, concurrency issues, memory leaks, and network instability reducing crash rates by 40%',
        'Developed push notification infrastructure using FCM + APNs with device token lifecycle management',
        'Implemented scheduler + batch components to automate weather scans, burn-window validation, and safety alert workflows',
      ],
      tech: ['Swift', 'Spring Boot', 'OAuth2', 'JWT', 'FCM', 'APNs'],
    },
    {
      role: 'Graduate Teaching Assistant',
      company: 'Oklahoma State University',
      location: 'Stillwater, OK',
      duration: 'Aug 2024 – April 2025',
      highlights: [
        'Supported 400+ students academically through mentoring in concepts, problem-solving strategies, and project development',
        'Strengthened student success by reviewing coursework, assessing project implementations, and providing actionable feedback',
        'Guided students through technical and academic challenges in Computer Science courses',
      ],
      tech: ['Teaching', 'Mentoring', 'Code Review'],
    },
    {
      role: 'Executive Engineer',
      company: 'Petronet MHB Limited',
      location: 'India',
      duration: 'Jul 2022 – Dec 2023',
      highlights: [
        'Architected and deployed Spring Boot microservices with RESTful APIs to process high-throughput SCADA/PLC telemetry streams',
        'Leveraged Apache Kafka for real-time data ingestion and Redis caching to optimize sub-second query performance',
        'Engineered complex SQL-based ETL pipelines using stored procedures and window functions, automating data transformations via Spring Batch',
        'Built responsive React dashboards integrated with Chart.js and D3.js for interactive operational KPI visualizations',
        'Implemented CI/CD pipelines via Jenkins/GitLab CI achieving 85%+ code coverage and zero-downtime deployments',
      ],
      tech: ['Spring Boot', 'Kafka', 'Redis', 'React', 'PostgreSQL', 'Jenkins'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-flowing z-40 bg-bg-primary min-h-screen"
    >
      <div className="w-full px-[6vw] py-[8vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left content */}
          <div>
            {/* Headline */}
            <h2
              ref={headlineRef}
              className="font-display font-black text-[clamp(34px,5vw,56px)] text-text-primary mb-12 will-change-transform"
            >
              EXPERI<span className="text-accent-lime">ENCE</span>
            </h2>

            {/* Experience cards */}
            <div ref={cardsRef} className="space-y-6">
              {experienceData.map((exp, index) => (
                <div
                  key={index}
                  className="exp-card glass-card p-6 cursor-pointer hover:-translate-y-1.5 transition-transform duration-300 will-change-transform"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-accent-lime/10 rounded">
                        <Briefcase className="w-5 h-5 text-accent-lime" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-text-primary">
                          {exp.role}
                        </h3>
                        <p className="text-text-secondary text-sm">
                          {exp.company}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-text-secondary/60 font-mono text-xs">
                            <Calendar className="w-3 h-3" />
                            {exp.duration}
                          </span>
                          <span className="flex items-center gap-1 text-text-secondary/60 font-mono text-xs">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${
                        expandedIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Expandable content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedIndex === index ? 'max-h-96 mt-4' : 'max-h-0'
                    }`}
                  >
                    <div className="pt-4 border-t border-text-primary/10">
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((highlight, hIndex) => (
                          <li
                            key={hIndex}
                            className="text-text-secondary/80 text-sm leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-accent-lime"
                          >
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, tIndex) => (
                          <span
                            key={tIndex}
                            className="skill-tag"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="hidden lg:flex items-start justify-end pt-20">
            <div
              ref={imageRef}
              className="relative w-full max-w-md will-change-transform"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="./images/exp_workspace.jpg"
                  alt="Workspace"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Accent border */}
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-accent-lime/30 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
