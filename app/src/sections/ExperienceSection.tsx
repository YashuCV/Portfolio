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
        'Leading development of a cross-platform energy assessment ecosystem for the Oklahoma Department of Commerce (ODOC) using Spring Boot microservices, React, Swift, and Kotlin to digitize energy audits.',
        'Leading a RAG-based AI chatbot for the ITAC website using Pinecone and OpenAI, automating tier-1 support by grounding responses in institutional documentation.',
      ],
      tech: ['Spring Boot', 'React', 'Swift', 'Kotlin', 'Pinecone', 'OpenAI'],
    },
    {
      role: 'Full Stack Developer | Graduate Assistant',
      company: 'Oklahoma State University',
      location: 'Stillwater, OK',
      duration: 'Jan 2024 – Dec 2025',
      highlights: [
        'Engineered cross-platform push notification infrastructure with FCM and APNs plus Spring Events, automating device token lifecycle and achieving ~98% delivery success.',
        'Orchestrated weather and geospatial data pipelines with Java and Spring WebClient, connection pooling, and multi-level caching to cut external API calls by ~40%.',
        'Resolved production bugs, concurrency issues, memory leaks, and network instability, reducing crash rates by ~40% across apps.',
        'Secured service APIs with Spring Security OAuth2 Resource Server and JWT, enforcing role-based access control and OWASP-aligned best practices.',
        'Led the complete SDLC from requirements analysis, distributed system design, Figma UI/UX collaboration, development to GitHub Actions for iOS applications Burn, GreenBug, Sorghum, Plant-it OK and BCC.',
      ],
      tech: ['Swift', 'Spring Boot', 'OAuth2', 'JWT', 'FCM', 'APNs'],
    },
    {
      role: 'Software Engineer',
      company: 'Petronet MHB Ltd',
      location: 'Hassan, India',
      duration: 'Jul 2022 – Dec 2023',
      highlights: [
        'Designed and delivered a Real Time Alarm (RTA) service with 27 REST APIs using Spring Boot, PostgreSQL, GraphQL, AngularJS, and RxJS, enabling operators to triage and acknowledge alerts 60% faster.',
        'Built a low-latency, event-driven WebSocket streaming layer using STOMP and SimpMessagingTemplate, publishing delta-encoded telemetry updates to the UI.',
        'Pioneered a complete RTA test suite (Mockito + JUnit + RestTemplate), achieving 95%+ code coverage and cutting release time by ~50%.',
        'Implemented circuit breakers in the data layer with Hystrix and Resilience4j to handle transient DB failures and enable automatic failover.',
        'Mentored two interns on backend design, testing, and production readiness.',
      ],
      tech: ['Spring Boot', 'PostgreSQL', 'GraphQL', 'AngularJS', 'RxJS', 'WebSocket', 'JUnit', 'Resilience4j'],
    },
    {
      role: 'Software Developer Intern',
      company: 'One Direct Technologies',
      location: 'Bengaluru, India',
      duration: 'Jan 2022 – Jun 2022',
      highlights: [
        'Built proof-of-concept conversational workflows by integrating Google Dialogflow to enable intent-based support journeys and operational metrics (bot handling time, agent response time, assignment latency).',
        'Enhanced a messaging microservice using Java, Spring Boot, RabbitMQ, Redis, and MongoDB, exposing secure, high-performance REST APIs for scalable conversational processing.',
      ],
      tech: ['Java', 'Spring Boot', 'RabbitMQ', 'Redis', 'MongoDB', 'Dialogflow'],
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
