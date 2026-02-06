import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Send, Phone, Copy, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactRowRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

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

      // Body animation
      gsap.fromTo(
        bodyRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.4,
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: '10vw', opacity: 0, rotate: 1 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.4,
          },
        }
      );

      // Contact row animation
      gsap.fromTo(
        contactRowRef.current,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.4,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only form handling
    const subject = `Message from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:yashwanthcv2000@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('yashwanthcv2000@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-flowing z-[80] bg-bg-primary min-h-screen flex items-center"
    >
      <div className="w-full px-[6vw] py-[10vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left content */}
          <div>
            {/* Headline */}
            <h2
              ref={headlineRef}
              className="font-display font-black text-[clamp(32px,4.5vw,56px)] text-text-primary leading-tight mb-8 will-change-transform"
            >
              LET'S BUILD<br />
              SOMETHING <span className="text-accent-lime">TOGETHER.</span>
            </h2>

            {/* Body */}
            <div ref={bodyRef} className="space-y-4 mb-10 max-w-md will-change-transform">
              <p className="text-text-secondary text-lg">
                I'm open to full-stack, mobile, and AI-forward roles.
              </p>
              <p className="text-text-secondary/80">
                If you have a project or a position in mind, send a message. I'd love to hear from you.
              </p>
            </div>

            {/* Contact row */}
            <div ref={contactRowRef} className="space-y-6 will-change-transform">
              {/* Email */}
              <div className="flex items-center gap-4">
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-3 group"
                >
                  <div className="p-3 bg-accent-lime/10 rounded group-hover:bg-accent-lime/20 transition-colors">
                    <Mail className="w-5 h-5 text-accent-lime" />
                  </div>
                  <div className="text-left">
                    <span className="block text-text-secondary text-sm">Email</span>
                    <span className="text-text-primary group-hover:text-accent-lime transition-colors">
                      yashwanthcv2000@gmail.com
                    </span>
                  </div>
                  {copied ? (
                    <Check className="w-4 h-4 text-accent-lime" />
                  ) : (
                    <Copy className="w-4 h-4 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <a
                  href="tel:+19186335960"
                  className="flex items-center gap-3 group"
                >
                  <div className="p-3 bg-text-primary/5 rounded group-hover:bg-accent-lime/10 transition-colors">
                    <Phone className="w-5 h-5 text-text-secondary group-hover:text-accent-lime transition-colors" />
                  </div>
                  <div>
                    <span className="block text-text-secondary text-sm">Phone</span>
                    <span className="text-text-primary group-hover:text-accent-lime transition-colors">
                      +1 9186335960
                    </span>
                  </div>
                </a>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-text-primary/5 rounded">
                    <span className="w-5 h-5 text-text-secondary font-mono text-xs flex items-center justify-center">
                      HQ
                    </span>
                  </div>
                  <div>
                    <span className="block text-text-secondary text-sm">Address</span>
                    <span className="text-text-primary">
                      Sunol St, San Jose, California
                    </span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://www.linkedin.com/in/yashwanth-veeranna-8b67121a7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-text-primary/5 hover:bg-accent-lime/10 text-text-secondary hover:text-accent-lime transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/YashuCV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-text-primary/5 hover:bg-accent-lime/10 text-text-secondary hover:text-accent-lime transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div
            ref={formRef}
            className="flex items-center justify-center lg:justify-end will-change-transform"
          >
            <div className="glass-card w-full max-w-md p-8">
              <h3 className="font-display font-bold text-xl text-text-primary mb-6">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-text-primary/5 border border-text-primary/10 text-text-primary placeholder:text-text-secondary/40 focus:border-accent-lime/60 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-text-primary/5 border border-text-primary/10 text-text-primary placeholder:text-text-secondary/40 focus:border-accent-lime/60 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-text-primary/5 border border-text-primary/10 text-text-primary placeholder:text-text-secondary/40 focus:border-accent-lime/60 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent-lime text-bg-primary font-mono text-sm uppercase tracking-wider hover:bg-accent-lime/90 transition-colors"
                >
                  {submitted ? (
                    <>
                      <Check className="w-4 h-4" />
                      Opening Email...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-20 md:mt-28 mb-4 flex justify-center">
          <p className="text-center text-white text-sm md:text-base font-mono">
            Brewed with ☕ and powered by Java.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
