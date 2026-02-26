import { ExternalLink, FileText } from 'lucide-react';

const AboutSection = () => {
  return (
    <section
      id="about"
      className="section-flowing z-20 bg-bg-primary min-h-screen flex items-center"
    >
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-[28vw] top-0 w-px h-full bg-text-primary/[0.06]" />
        <div className="absolute left-[52vw] top-0 w-px h-full bg-text-primary/[0.06]" />
        <div className="absolute left-[76vw] top-0 w-px h-full bg-text-primary/[0.06]" />
      </div>

      <div className="relative w-full px-[6vw] py-[10vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            <h2 className="font-display font-black text-[clamp(34px,5vw,56px)] text-text-primary mb-8">
              ABOUT <span className="text-accent-lime">ME</span>
            </h2>

            <div className="space-y-6 max-w-xl">
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                I'm passionate about creating software that solves real problems and delivers measurable impact, whether that's helping industrial operators make faster decisions or enabling state agencies to modernize legacy processes.
              </p>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                I'm a Full Stack Software Engineer with 4+ years of experience turning complex challenges into solutions that people actually want to use. My experience spans distributed systems, microservices, AI integrations, and mobile development, but what truly drives me is building technology that makes a difference.
              </p>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                I believe the best technology doesn't just work well, it transforms how people work, making their jobs easier and their outcomes better.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <a
                href="mailto:yashwanthcveeranna@gmail.com?subject=Resume Request"
                className="group flex items-center gap-2 px-5 py-2.5 border border-accent-lime/60 text-accent-lime hover:bg-accent-lime hover:text-bg-primary transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                <span className="font-mono text-sm uppercase tracking-wider">
                  View Resume
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/yashwanth-veeranna-8b67121a7/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <span className="font-mono text-sm uppercase tracking-wider">
                  LinkedIn
                </span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="./images/about_portrait.png"
                  alt="Yashwanth"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-accent-lime/30 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
