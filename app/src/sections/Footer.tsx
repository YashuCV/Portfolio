const Footer = () => {
  return (
    <footer className="relative z-[90] bg-bg-secondary py-12">
      <div className="absolute top-0 left-0 right-0 h-px bg-text-primary/10" />

      <div className="px-[6vw]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-base text-white">
              Yashwanth Veeranna
            </span>
            <span className="text-white/70">|</span>
            <span className="font-mono text-sm text-white/80">
              © 2026
            </span>
          </div>

          {/* Center - quick links */}
          <div className="flex items-center gap-6">
            <a
              href="#about"
              className="text-white/80 hover:text-accent-lime text-sm md:text-base transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white/80 hover:text-accent-lime text-sm md:text-base transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-white/80 hover:text-accent-lime text-sm md:text-base transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-white/80 hover:text-accent-lime text-sm md:text-base transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 text-white text-sm md:text-base">
            <span>Thanks for visiting.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
