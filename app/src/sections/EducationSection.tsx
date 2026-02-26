import { GraduationCap, Calendar, Award, ExternalLink } from 'lucide-react';

const EducationSection = () => {
  const educationData = [
    {
      degree: 'MS in Computer Science',
      school: 'Oklahoma State University',
      duration: 'Jan 2024 – Dec 2025',
      detail: 'GPA: 3.7',
      icon: Award,
      url: 'https://go.okstate.edu/',
    },
    {
      degree: 'BTech in Electrical & Electronics Engineering',
      school: 'National Institute of Technology, Karnataka',
      duration: 'Jul 2018 – May 2022',
      detail: 'GPA: 7.6',
      icon: GraduationCap,
      url: 'https://www.nitk.ac.in/',
    },
  ];

  return (
    <section
      id="education"
      className="section-pinned z-30 bg-bg-secondary"
    >
      <div className="absolute left-0 top-0 w-[55vw] h-full flex flex-col">
        {/* OSU */}
        <div className="relative h-1/2 overflow-hidden">
          <img
            src="./images/edu_osu.png"
            alt="Oklahoma State University campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-transparent to-bg-primary/70" />
        </div>

        {/* NITK */}
        <div className="relative h-1/2 overflow-hidden border-t border-bg-primary/40">
          <img
            src="./images/edu_nitk.png"
            alt="National Institute of Technology Karnataka campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/70 via-transparent to-bg-primary/60" />
        </div>

        {/* Side fade to blend into panel */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg-primary/70 via-transparent to-bg-secondary/90" />
      </div>

      <div className="absolute right-0 top-0 w-[45vw] h-full bg-bg-secondary flex flex-col justify-center px-[4vw]">
        <h2 className="font-display font-black text-[clamp(34px,4vw,56px)] text-text-primary mb-12">
          EDU<span className="text-accent-lime">CATION</span>
        </h2>

        <div className="space-y-10">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="edu-entry group relative pl-6 border-l-2 border-text-primary/20 hover:border-accent-lime/60 transition-colors"
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
                    <a
                      href={edu.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-accent-lime transition-colors underline-offset-4 hover:underline"
                    >
                      {edu.school}
                      <ExternalLink className="w-3 h-3 text-text-secondary/70" />
                    </a>
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
