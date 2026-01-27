import { useState } from 'react';
import { Card } from "./ui/card";
import { useLanguage } from '@/hooks/use-language';
import vitaLogo from '../assets/VITA.webp';
import housyogo from '../assets/housy.webp';
import howeLogo from '../assets/howe.webp';
import stafiaLogo from '../assets/STAFIA.webp';

const Projects = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const projectsData = [
    {
      id: 1,
      category: t('projects.list.howe.category'),
      title: "HOWE",
      description: t('projects.list.howe.description'),
      image: howeLogo,
      tags: ["React Native", "Python", "AI", "Children Digital Impact"],
      challenge: t('projects.list.howe.challenge'),
      solution: t('projects.list.howe.solution'),
      result: t('projects.list.howe.result'),
      url: "https://howeapp.com/"
    },
    {
      id: 2,
      category: t('projects.list.housy.category'),
      title: "HOUSY",
      description: t('projects.list.housy.description'),
      image: housyogo,
      tags: ["React", "AI", "PropTech", "Machine Learning"],
      challenge: t('projects.list.housy.challenge'),
      solution: t('projects.list.housy.solution'),
      result: t('projects.list.housy.result'),
      url: "https://www.housycorp.com/"
    },
    {
      id: 3,
      category: t('projects.list.vita.category'),
      title: "VITA",
      description: t('projects.list.vita.description'),
      image: vitaLogo,
      tags: ["Blockchain", "React", "KYC/KYB", "Marketplace"],
      challenge: t('projects.list.vita.challenge'),
      solution: t('projects.list.vita.solution'),
      result: t('projects.list.vita.result'),
      url: "https://www.the-vita.com/"
    },
    {
      id: 4,
      category: t('projects.list.stafia.category'),
      title: "STAFIA",
      description: t('projects.list.stafia.description'),
      image: stafiaLogo,
      tags: ["AI", "Cybersecurity", "SaaS", "Fraud Detection"],
      challenge: t('projects.list.stafia.challenge'),
      solution: t('projects.list.stafia.solution'),
      result: t('projects.list.stafia.result'),
      url: "https://stafialatam.com/"
    }
  ];
  return (
    <section id="proyectos" className="relative py-20 overflow-hidden">
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{t('projects.title')}</span>
          </h2>
          <p className="text-xl sm:text-2xl text-white/70 mt-4 max-w-3xl mx-auto">
            {t('projects.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projectsData.map((project, index) => (
            <Card 
              key={project.id} 
              className="product-card-glow relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:border-white/20 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:bg-black/30"
              onClick={() => setOpenIndex(index)}
              tabIndex={0}
              role="button"
              aria-expanded={openIndex === index}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpenIndex(index); }}
            >
              {/* Imagen compacta */}
              <div className="flex items-center justify-center p-4 bg-gradient-to-br from-slate-900/30 to-black/20 h-44">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className={"w-28 h-28 object-contain transition-all duration-300 group-hover:scale-110 filter grayscale(1) contrast(1.3) brightness(1.2)"}
                />
              </div>
              
              <div className="p-4">
                <span className="text-xs font-medium text-gradient uppercase tracking-wide">{project.category}</span>
                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-slate-200 via-white to-cyan-200 bg-clip-text text-transparent">
                  {project.title}
                </h3>
                <p className="text-slate-300/80 mb-3 line-clamp-2 leading-relaxed text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 rounded-md text-xs bg-white/5 text-white/70 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 rounded-md text-xs bg-white/5 text-white/50 border border-white/10">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.url, '_blank');
                    }}
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {t('projects.buttons.link')}
                  </button>
                  <span className="text-white/40">Ver detalles →</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal de proyecto */}
        {openIndex !== null && projectsData[openIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/70 backdrop-blur-sm p-4">
            <div className="relative bg-black/30 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl w-full max-w-[90vw] sm:max-w-md md:max-w-lg max-h-[85vh] overflow-y-auto animate-fade-in">
              <div className="p-6">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl font-bold focus:outline-none z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
                  onClick={() => setOpenIndex(null)}
                  aria-label="Cerrar"
                >
                  ×
                </button>
                
                {/* Imagen del proyecto */}
                <div className="flex items-center justify-center mb-4 pt-2">
                  <img
                    src={projectsData[openIndex].image}
                    alt={projectsData[openIndex].title}
                    className={"w-24 h-24 object-contain filter grayscale(1) contrast(1.3) brightness(1.2)"}
                  />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-slate-200 via-white to-cyan-200 bg-clip-text text-transparent">
                  {projectsData[openIndex].title}
                </h3>
                
                {/* Información compacta */}
                <div className="space-y-4 mb-6">
                  {/* Desafío */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gradient flex items-center">
                      🎯 {t('projects.cardTitles.challenge')}
                    </h4>
                    <p className="text-white/80 leading-relaxed text-sm">
                      {projectsData[openIndex].challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gradient flex items-center">
                      💡 {t('projects.cardTitles.solution')}
                    </h4>
                    <p className="text-white/80 leading-relaxed text-sm">
                      {projectsData[openIndex].solution}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gradient flex items-center">
                      🚀 {t('projects.cardTitles.result')}
                    </h4>
                    <p className="text-white/80 leading-relaxed text-sm">
                      {projectsData[openIndex].result}
                    </p>
                  </div>
                </div>
                
                {/* Tags compactos */}
                <div className="border-t border-white/10 pt-4 mb-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {projectsData[openIndex].tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 rounded-md text-xs bg-blue-500/20 text-blue-300 border border-blue-400/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* CTA */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => window.open(projectsData[openIndex].url, '_blank')}
                    className="btn-hero flex items-center justify-center gap-2 w-full"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {t('projects.buttons.visit')}
                  </button>
                  <button
                    onClick={() => {
                      setOpenIndex(null);
                      document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-secondary w-full"
                  >
                    {t('projects.buttons.info')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
