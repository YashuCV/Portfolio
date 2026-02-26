import { useState } from 'react';
import { ExternalLink, Github, X, ChevronRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
}

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: 'Zeno — Voice Assistant',
      description: 'Personal AI assistant for email, calendar, and expenses.',
      fullDescription: 'A personal AI voice assistant that handles natural-language commands for email (Gmail/SMTP), WhatsApp (Twilio), calendar (Google Calendar), checklist management, reminders, and expense tracking. Features voice input via Web Speech API, multi-intent routing (single utterance can trigger multiple actions), and n8n workflow orchestration with LangChain agents.',
      tags: ['React', 'n8n', 'Web Speech API', 'OpenAI', 'Google APIs'],
      image: './images/project_zeno.jpg',
      github: 'https://github.com/YashuCV',
      demo: 'https://yashucv.github.io/ZENO-AI_Assistant_Demo/',
    },
    {
      title: 'Cricket Scorecard App',
      description: 'iOS cricket scoring app with SwiftUI and Core Data.',
      fullDescription: 'Built a modular iOS cricket scorecard app using SwiftUI and Core Data for persistent match storage. Implements MVVM architecture with reusable UI components and a centralized data repository for scalable scoring, player management, and result visualization. Features real-time score tracking, player statistics, match history, and intuitive user interface designed for cricket enthusiasts.',
      tags: ['Swift', 'SwiftUI', 'Core Data', 'MVVM', 'iOS'],
      image: './images/project_cricket.jpg',
      github: 'https://github.com/YashuCV/Cricket-score-Card',
      demo: 'https://yashucv.github.io/CricPulse-Cricket_Game_Tracker_Demo/',
    },
    {
      title: 'Planora — AI Trip Planner',
      description: 'Natural-language trip planning with day-by-day itineraries.',
      fullDescription: 'An AI-powered travel planning assistant that creates complete trips with detailed day-by-day itineraries including activities, dining, and attractions. Features natural language trip planning, smart itinerary generation with specific attractions and restaurants, user authentication with JWT, trip management (create, view, delete), and integration with Groq API (llama-3.3-70b) as a free alternative to OpenAI.',
      tags: ['React 18', 'TypeScript', 'Vite', 'Node.js', 'PostgreSQL', 'Groq API'],
      image: './images/project_planora.jpg',
      github: 'https://github.com/YashuCV/Planora-AI_Powered_Trip_Planning',
      demo: 'https://yashucv.github.io/Planora-AI_Trip_Planner_Demo/',
    },
    {
      title: 'Loom — Job Scraper',
      description: 'Multi-source job aggregator with H1B sponsorship detection.',
      fullDescription: 'A full-stack job scraping application that aggregates job listings from Indeed, LinkedIn (via JSearch API), and ZipRecruiter. Features smart H1B sponsorship detection, location and experience filters, real-time data for jobs posted within 24 hours, and deduplication across sources. Built with a modern React frontend and Node.js/Express backend using Cheerio for HTML parsing.',
      tags: ['React', 'Node.js', 'Express', 'Cheerio', 'TypeScript', 'Tailwind CSS'],
      image: './images/project_loom.jpg',
      github: 'https://github.com/YashuCV/Loom_Job_Scrapper',
      demo: 'https://yashucv.github.io/Loom-Job_Scrapper_Demo/',
    },
    {
      title: 'Etherscan Agent',
      description: 'Local LLM agent that answers Ethereum queries via Etherscan.',
      fullDescription: 'An intelligent Ethereum blockchain assistant powered by Ollama (local LLM), LangChain tools, and Etherscan API. Ask natural-language questions about Ethereum mainnet, and the agent dynamically calls tools to fetch the correct blockchain data. Supports queries about latest block info, miner addresses, transaction counts, gas used, and Ether balances of any address.',
      tags: ['Python', 'LangChain', 'Streamlit', 'Ollama', 'Etherscan API'],
      image: './images/project_etherscan.jpg',
      github: 'https://github.com/YashuCV/Ollama-Agent',
    },
    {
      title: 'AI Resume Screener',
      description: 'NLP pipeline for automated resume parsing and classification.',
      fullDescription: 'Created a custom NLP pipeline using spaCy and Named Entity Recognition (NER) to extract skills, education, and experience from resumes. Integrated a machine learning classifier (TF-IDF + Random Forest) into a Flask REST backend to categorize resumes by job role and industry. Built a React frontend that presents structured JSON results in milliseconds, enabling efficient candidate screening and analysis.',
      tags: ['Python', 'spaCy', 'Flask', 'React', 'NLP', 'Machine Learning'],
      image: './images/project_resume.jpg',
      github: 'https://github.com/YashuCV',
    },
  ];

  return (
    <section
      id="projects"
      className="section-flowing z-[60] bg-bg-primary min-h-screen"
    >
      <div className="w-full px-[6vw] py-[8vh]">
        <div className="mb-12">
          <h2 className="font-display font-black text-[clamp(34px,5vw,56px)] text-text-primary mb-4">
            PRO<span className="text-accent-lime">JECTS</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl">
            Few things I've built from automation scrapers to full stack products to intelligent agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group glass-card overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-text-primary mb-2 group-hover:text-accent-lime transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, tIndex) => (
                      <span
                        key={tIndex}
                        className="px-2 py-1 text-xs font-mono bg-text-primary/5 text-text-secondary/70"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs font-mono text-text-secondary/50">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-accent-lime group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg-primary/90 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header image */}
            <div className="aspect-[16/9] relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-bg-primary/80 hover:bg-bg-primary text-text-primary rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-6">
              <h3 className="font-display font-bold text-2xl text-text-primary mb-3">
                {selectedProject.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {selectedProject.fullDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, tIndex) => (
                  <span
                    key={tIndex}
                    className="skill-tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-text-primary/5 hover:bg-accent-lime/10 text-text-primary hover:text-accent-lime transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span className="font-mono text-sm">View Code</span>
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-accent-lime/60 text-accent-lime hover:bg-accent-lime hover:text-bg-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="font-mono text-sm">View Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
