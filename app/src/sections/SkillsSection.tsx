import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Layout, Server, Cloud } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);

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

      const groups = groupsRef.current?.querySelectorAll('.skill-group');
      if (groups) {
        scrollTl.fromTo(
          groups,
          { y: '12vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, ease: 'power2.out' },
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

      if (groups) {
        scrollTl.fromTo(
          groups,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, stagger: 0.03, ease: 'power2.in' },
          0.74
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const skillsData = [
    {
      category: 'Languages',
      icon: Code,
      skills: ['Java', 'Python', 'JavaScript', 'Swift', 'SQL', 'C#'],
    },
    {
      category: 'Frontend & Mobile',
      icon: Layout,
      skills: ['React', 'SwiftUI', 'AngularJS', 'React Native', 'HTML5', 'CSS3', 'Tailwind CSS'],
    },
    {
      category: 'Backend & Data',
      icon: Server,
      skills: ['Spring Boot', 'Node.js', 'Flask', 'Kafka', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    },
    {
      category: 'AI & ML',
      icon: Server,
      skills: ['PyTorch', 'TensorFlow', 'MCP', 'Guardrails AI', 'Pinecone', 'RAG', 'Prompt Engineering'],
    },
    {
      category: 'Cloud & DevOps',
      icon: Cloud,
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'CI/CD', 'Firebase'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-pinned z-50 bg-bg-secondary"
    >
      {/* Left image */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[55vw] h-full will-change-transform"
      >
        <img
          src="./images/skills_keyboard.jpg"
          alt="Skills"
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
          SKI<span className="text-accent-lime">LLS</span>
        </h2>

        {/* Skill groups */}
        <div ref={groupsRef} className="space-y-8">
          {skillsData.map((group, index) => (
            <div
              key={index}
              className="skill-group will-change-transform"
            >
              <div className="flex items-center gap-3 mb-3">
                <group.icon className="w-4 h-4 text-accent-lime" />
                <h3 className="font-display font-semibold text-sm text-text-primary uppercase tracking-wider">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 animate-tag-shift">
                {group.skills.map((skill, sIndex) => (
                  <span
                    key={sIndex}
                    className="skill-tag cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-10 pt-6 border-t border-text-primary/10">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <span className="block font-display font-bold text-2xl text-accent-lime">4+</span>
              <span className="text-text-secondary/60 font-mono text-xs uppercase">Years Exp</span>
            </div>
            <div className="w-px h-10 bg-text-primary/10" />
            <div className="text-center">
              <span className="block font-display font-bold text-2xl text-accent-lime">15+</span>
              <span className="text-text-secondary/60 font-mono text-xs uppercase">Projects</span>
            </div>
            <div className="w-px h-10 bg-text-primary/10" />
            <div className="text-center">
              <span className="block font-display font-bold text-2xl text-accent-lime">6+</span>
              <span className="text-text-secondary/60 font-mono text-xs uppercase">Languages</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
