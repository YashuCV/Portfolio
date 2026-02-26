import { Award, ExternalLink } from 'lucide-react';

const CertificationsSection = () => {
  const certifications = [
    {
      name: 'Tableau Desktop Specialist',
      platform: 'Tableau',
      year: '2024',
      description: 'Certified in data visualization and dashboard creation using Tableau.',
      url: 'https://drive.google.com/file/d/15AKl2suT_rrZgfdaqsYFrtFYAmPDOYNZ/view?usp=sharing',
    },
    {
      name: 'Digital Marketing',
      platform: 'Google',
      year: '2020',
      description: 'Comprehensive certification covering SEO, SEM, and digital analytics.',
      url: 'https://drive.google.com/file/d/1r0bCF-0CzXmyR8DV9HsCxL6aUXe5mHhX/view',
    },
  ];

  return (
    <section
      id="certifications"
      className="section-pinned z-[70] bg-bg-secondary"
    >
      <div className="absolute left-0 top-0 w-[55vw] h-full">
        <img
          src="./images/certs_workspace.jpg"
          alt="Certifications"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-secondary/80" />
      </div>

      <div className="absolute right-0 top-0 w-[45vw] h-full bg-bg-secondary flex flex-col justify-center px-[4vw]">
        <h2 className="font-display font-black text-[clamp(34px,4vw,56px)] text-text-primary mb-10">
          CERTIFI<span className="text-accent-lime">CATIONS</span>
        </h2>

        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="cert-card glass-card p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-lime/10 rounded">
                  <Award className="w-6 h-6 text-accent-lime" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg text-text-primary mb-1">
                    {cert.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-text-secondary text-sm">
                      {cert.platform}
                    </span>
                    <span className="w-1 h-1 bg-text-secondary/40 rounded-full" />
                    <span className="font-mono text-xs text-accent-lime">
                      {cert.year}
                    </span>
                  </div>
                  <p className="text-text-secondary/70 text-sm">
                    {cert.description}
                  </p>
                </div>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-text-secondary hover:text-accent-lime transition-colors"
                  aria-label={`View ${cert.name} certificate`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative */}
        <div className="mt-10 flex items-center gap-3">
          <div className="w-8 h-px bg-accent-lime/40" />
          <span className="font-mono text-xs text-text-secondary/50 uppercase tracking-wider">
            Continuous Learning
          </span>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
