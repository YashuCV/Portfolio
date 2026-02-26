import { Code, Layout, Server, Cloud } from 'lucide-react';

const SkillsSection = () => {
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
      id="skills"
      className="section-pinned z-50 bg-bg-secondary"
    >
      <div className="absolute left-0 top-0 w-[55vw] h-full">
        <img
          src="./images/skills_keyboard.jpg"
          alt="Skills"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-secondary/80" />
      </div>

      <div className="absolute right-0 top-0 w-[45vw] h-full bg-bg-secondary flex flex-col justify-center px-[4vw]">
        <h2 className="font-display font-black text-[clamp(34px,4vw,56px)] text-text-primary mb-10">
          SKI<span className="text-accent-lime">LLS</span>
        </h2>

        <div className="space-y-8">
          {skillsData.map((group, index) => (
            <div
              key={index}
              className="skill-group"
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
