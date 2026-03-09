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

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: '40px', opacity: 0 },
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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.exp-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { x: '-40px', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
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

  const experienceData = [
    {
      role: 'Software Developer',
      company: 'OK STATE - Industrial Training & Assessment Center',
      location: 'Remote',
      duration: 'Jan 2026 – Present',
      highlights: [
        'Architected a full-stack energy assessment platform for the Oklahoma Department of Commerce, digitizing 100% of manual audits and improving reporting efficiency.',
        'Developed a RAG-based AI chatbot using Pinecone, LangChain, and OpenAI to automate tier-1 support queries, grounding responses in institutional documentation with an output validation layer to block hallucinated or off-topic responses before reaching users.',
      ]
    },
    {
      role: 'Full Stack Developer | Graduate Assistant',
      company: 'Oklahoma State University',
      location: 'Stillwater, OK',
      duration: 'Jan 2024 – Dec 2025',
      highlights: [
        'Solely owned the full SDLC for 5 production applications, independently managing everything from requirements and system design through to production deployment.',
        'Built and maintained GitHub Actions CI/CD pipelines, automating build, test, and deploy workflows end-to-end.',
        'Secured all service APIs using OAuth 2.0 JWT with role-based access control per OWASP standards, and implemented push notifications via FCM and APNs achieving a 98% delivery success rate.',
        'Integrated a GPT-4 and LangChain fallback layer for dynamic data generation achieving 100% search coverage, and resolved critical async and database connection lifecycle issues reducing application crash rate by 70%.',
      ]
    },
    {
      role: 'Senior Software Developer',
      company: 'Wells Fargo',
      location: 'Remote',
      duration: 'Jul 2022 – Dec 2023',
      highlights: [
        'Implemented retry logic with exponential backoff and circuit breaker patterns on third-party payment APIs, reducing failed loan-eligibility checks from 120/day to under 10 and ensuring zero cascading failures during outages.',
        'Integrated a Redis caching layer into the Rate Lookup service with a 60-second TTL, achieving a 92% cache hit rate and reducing average response time from 500ms to under 50ms during pre-approval flows.',
        'Refactored a 2,400-line God-class in the Loan Origination module into focused domain-specific classes, increasing unit test coverage from 25% to 67% over three sprints.',
        'Created Helm charts for microservices on OpenShift to standardize Kubernetes deployments across environments, resolving config drift between staging and production.',
        'Migrated document storage from on-prem NFS to Azure Blob Storage with lifecycle tiering policies as part of a team-led cloud migration. Integrated full-text search indexing, reducing query response times from 1.8s to under 200ms on high-volume datasets.',
        'Developed an AI-powered proof-of-concept microservice delivering sub-2 second semantic search across internal compliance documentation. Mentored 2 interns through consistent code reviews and technical guidance.',
      ]
    },
    {
      role: 'Software Developer',
      company: 'Wells Fargo',
      location: 'Remote',
      duration: 'Jul 2021 – Jul 2022',
      highlights: [
        'Extended backend microservices with OAuth 2.0 secured endpoints and Kafka event-driven messaging, reducing manual operations tickets by 18% and eliminating peak-load timeouts across payment workflows.',
        'Exposed GraphQL APIs and integrated third-party REST APIs to automate data retrieval, reducing manual workload for operations and underwriting teams by up to 25%.',
        'Containerized services using Docker multi-stage builds, reducing image sizes by over 50% ahead of a Kubernetes migration.',
        'Modernized frontend state management using Redux Toolkit across 8 components, resolving stale-state issues and actively resolved production bugs improving stability across critical financial workflows.',
      ]
    },
    {
      role: 'Software Developer Intern',
      company: 'Wells Fargo',
      location: 'Remote',
      duration: 'Jan 2021 – July 2021',
      highlights: [
        'Built and improved backend services including REST API development, data validation, and query optimization, measurably improving performance and reliability. Strengthened code quality by writing unit tests across null-input and boundary-value scenarios, raising test coverage.'
      ]
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
                      {Array.isArray((exp as any).tech) && (exp as any).tech.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {(exp as any).tech.map((tech: string, tIndex: number) => (
                            <span
                              key={tIndex}
                              className="skill-tag"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="hidden lg:flex items-center justify-center">
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
