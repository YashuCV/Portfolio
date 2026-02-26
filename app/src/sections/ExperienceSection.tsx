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
      role: 'Software Developer',
      company: 'OK STATE - Industrial Training & Assessment Center',
      location: 'Stillwater, OK',
      duration: 'Jan 2026 – Present',
      highlights: [
        'Architected a cross-platform energy assessment ecosystem using Spring Boot microservices and React, digitizing 100% of manual energy audits and improving reporting efficiency for the Oklahoma Department of Commerce (ODOC).',
        'Leading RAG-based AI chatbot for ITAC website using Pinecone, OpenAI, LangChain, and FastAPI, automating tier-1 support by grounding responses in institutional documentation with response validation through Guardrails AI.',
      ],
      tech: ['Spring Boot', 'React', 'Pinecone', 'OpenAI', 'LangChain', 'FastAPI', 'Guardrails AI'],
    },
    {
      role: 'Full-Stack Developer | Graduate Assistant',
      company: 'Oklahoma State University',
      location: 'Stillwater, OK',
      duration: 'Jan 2024 – Dec 2025',
      highlights: [
        'Engineered cross-platform push notification infrastructure utilizing FCM and APNs with automated device token lifecycle management and event-driven triggers via Spring Events, achieving 98% delivery success rate.',
        'Orchestrated weather and geospatial data pipelines using Java and Spring WebClient, implementing connection pooling and multi-level caching to reduce external API dependency by 40%.',
        'Resolved production bugs, concurrency issues, memory leaks, and network instability reducing crash rates by 40%.',
        'Secured service APIs using Spring Security OAuth2 Resource Server and JWT, enforcing role-based access control and data integrity in alignment with OWASP recommendations.',
        'Managed the complete SDLC from requirements analysis, distributed system design, Figma UI/UX collaboration, development to GitHub Actions for these iOS applications Burn, GreenBug, Sorghum, Plant-it OK and BCC.',
      ],
      tech: ['Swift', 'Spring Boot', 'OAuth2', 'JWT', 'FCM', 'APNs'],
    },
    {
      role: 'Software Engineer',
      company: 'Petronet MHB Ltd',
      location: 'Hassan, India',
      duration: 'Jul 2022 – Dec 2023',
      highlights: [
        'Designed & Delivered (Real Time Alarm) RTA service with 27 Rest APIs using Spring Boot, PostgreSQL, GraphQL, AngularJs and RxJS to enable operators to filter, triage, and acknowledge alerts with 60% faster response times.',
        'Designed a high-performance streaming layer using STOMP and SimpMessagingTemplate, achieving sub-100ms latency for telemetry updates and increasing UI responsiveness for critical data monitoring.',
        'Pioneered complete test suite in RTA module, consisting of Mockito JUnit test cases and RestTemplate integration test cases, achieving over 95% code coverage and reducing software release time by 50%.',
        'Developed circuit breaker functionality in the database layer using Hystrix and Resilience4j to handle temporary failures, enabling automatic failover to backup databases for improved service reliability.',
        'Mentored 2 interns providing guidance & support to enhance their skills in software development and project management.',
      ],
      tech: ['Spring Boot', 'PostgreSQL', 'GraphQL', 'AngularJS', 'RxJS', 'STOMP', 'JUnit', 'Resilience4j'],
    },
    {
      role: 'Software Developer Intern',
      company: 'One Direct Technologies',
      location: 'Bengaluru, India',
      duration: 'Jan 2022 – June 2022',
      highlights: [
        'Developed a Proof of Concept (POC) integrating Google DialogFlow to automate conversational workflows, enabling real-time tracking of agent response times and reducing manual monitoring overhead by 55%.',
        'Scaled a messaging microservice using Java, Spring Boot, and RabbitMQ, enabling high-throughput conversational processing and improving API response times.',
      ],
      tech: ['Java', 'Spring Boot', 'RabbitMQ', 'DialogFlow'],
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
                      expandedIndex === index ? 'max-h-[28rem] mt-4' : 'max-h-0'
                    }`}
                  >
                    <div className="pt-4 border-t border-text-primary/10">
                      <ul className="space-y-2 text-sm text-text-secondary">
                        {exp.highlights.map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-accent-lime mt-0.5 shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
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
