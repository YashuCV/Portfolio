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

      const groups = groupsRef.current?.querySelectorAll('.skill-group');
      if (groups) {
        gsap.fromTo(
          groups,
          { y: '30px', opacity: 0 },
          {
            y: 0,
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
      category: 'Cloud & DevOps',
      icon: Cloud,
      skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'CI/CD'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full bg-bg-secondary"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]">
        {/* Left image */}
        <div
          ref={imageRef}
          className="hidden lg:block relative h-screen overflow-hidden will-change-transform"
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
          className="bg-bg-secondary flex flex-col justify-center px-[4vw] py-16 min-h-screen lg:min-h-0"
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
                <div className="flex flex-wrap gap-2">
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

          {/* Stats */}
          <div className="mt-10 pt-6 border-t border-text-primary/10">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="block font-display font-bold text-2xl text-accent-lime">5+</span>
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
      </div>
    </section>
  );
};

export default SkillsSection;
