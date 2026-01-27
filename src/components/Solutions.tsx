
import { useState, useRef, useEffect } from 'react';
import { Brain, Zap, Target, Rocket, HeartPulse, GraduationCap, Gamepad2, Leaf, Plane } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import robotImg from '@/assets/ROBOT.webp';

const Solutions = () => {
  const { t } = useLanguage();

  const solutions = [
    {
      icon: <Zap className="w-8 h-8 text-white" />, // Finance
      sector: 'finance',
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-white" />, // Healthcare
      sector: 'healthcare',
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-white" />, // Education
      sector: 'education',
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-white" />, // Games
      sector: 'games',
    },
    {
      icon: <Leaf className="w-8 h-8 text-white" />, // Energy
      sector: 'energy',
    },
    {
      icon: <Plane className="w-8 h-8 text-white" />, // Aerospace
      sector: 'aerospace',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Carrusel vertical: scroll suave automático
  const VISIBLE = 3;
  const CARD_HEIGHT = 160; // Altura ajustada para responsive
  const GAP = 20; // Gap fijo
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  
  // Duplicar soluciones para loop infinito
  const carouselSolutions = [...solutions, ...solutions];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    const translateY = scrollIndex * (CARD_HEIGHT + GAP);
    el.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    el.style.transform = `translateY(-${translateY}px)`;
    
    // Reset cuando lleguemos al final
    if (scrollIndex >= solutions.length) {
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'none';
        el.style.transform = 'translateY(0px)';
        setScrollIndex(0);
      }, 800);
    }
  }, [scrollIndex, solutions.length]);

  return (
    <section id="soluciones" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{t('solutions.title')}</span>
          </h2>
          <p className="text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto">
            {t('solutions.description')}
          </p>
        </div>

        {/* Imagen + Carrusel en flex horizontal */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 mb-12">
          {/* Imagen a la izquierda */}
          <div className="flex-shrink-0 w-full lg:w-[400px] xl:w-[440px] h-[400px] md:h-[500px] lg:h-[680px] rounded-3xl overflow-hidden shadow-lg bg-black/30 flex items-center justify-center">
            <img 
              src={robotImg}
              alt="Robot" 
              className="object-cover w-full h-full" 
              draggable="false"
            />
          </div>
          {/* Carrusel a la derecha */}
          <div className="relative w-full max-w-[800px] h-[400px] md:h-[500px] lg:h-[680px]">
            {/* Efectos glow externos más sutiles */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-2/3 h-12 bg-gradient-to-b from-blue-500/20 via-blue-400/10 to-transparent blur-xl pointer-events-none z-0"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-2/3 h-12 bg-gradient-to-t from-blue-500/20 via-blue-400/10 to-transparent blur-xl pointer-events-none z-0"></div>
            
            {/* Contenedor principal estilo productos */}
            <div className="relative rounded-3xl backdrop-blur-sm bg-black/5 border border-white/5 overflow-hidden h-full">
              {/* Gradientes internos más sutiles */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-blue-500/10 via-blue-400/5 to-transparent pointer-events-none z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-500/10 via-blue-400/5 to-transparent pointer-events-none z-10"></div>
              
              <div className="absolute inset-0 p-4 md:p-6">
              <div
                ref={scrollRef}
                className="flex flex-col"
                style={{ willChange: 'transform', gap: `${GAP}px` }}
              >
                {carouselSolutions.map((solution, index) => {
                  const sector = solution.sector;
                  return (
                    <div
                      key={`${sector}-${index}`}
                      className="solutions-card-glow relative bg-black/10 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-4 md:px-6 md:py-6 transition-all duration-300 cursor-pointer group hover:-translate-y-1 h-[140px] md:h-[160px] lg:h-[190px]"
                      style={{ 
                        animationDelay: `${(index % solutions.length) * 0.15}s`,
                        willChange: 'transform, opacity',
                        isolation: 'isolate'
                      }}
                      tabIndex={0}
                      role="button"
                      aria-expanded={openIndex === (index % solutions.length)}
                      onClick={() => setOpenIndex(index % solutions.length)}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpenIndex(index % solutions.length); }}
                    >
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="service-icon mb-2 md:mb-3 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-transparent group-hover:from-blue-500/40 group-hover:via-blue-400/30 transition-all duration-300 flex-shrink-0">
                          {solution.icon}
                        </div>
                        <h3 className="text-sm md:text-lg lg:text-xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-slate-200 via-white to-cyan-200 bg-clip-text text-transparent drop-shadow-sm leading-tight flex-shrink-0">{t(`solutions.sectors.${sector}.title`)}</h3>
                        <p className="leading-snug text-xs md:text-sm lg:text-base text-slate-300/90 group-hover:text-slate-200/95 transition-colors duration-300 overflow-hidden flex-1"
                           style={{
                             display: '-webkit-box',
                             WebkitLineClamp: 3,
                             WebkitBoxOrient: 'vertical',
                             textOverflow: 'ellipsis'
                           }}
                        >{t(`solutions.sectors.${sector}.short`)}</p>
                      </div>
                      {/* Línea futurista al lado izquierdo */}
                      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Modal de servicio */}
        {openIndex !== null && solutions[openIndex] && (
          <div className="fixed inset-0 z-50 flex flex-col items-start md:items-center md:justify-center min-h-screen bg-black/60 backdrop-blur-sm p-2 sm:p-4">
            <div className="relative bg-black/20 dark:bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[96vw] sm:max-w-sm md:max-w-md max-h-[95vh] overflow-y-auto mt-4 md:mt-0 animate-fade-in p-3 sm:p-6 md:p-8">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-500 text-2xl font-bold focus:outline-none"
                onClick={() => setOpenIndex(null)}
                aria-label="Cerrar"
              >
                ×
              </button>
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-blue-400/10 mb-4 sm:mb-6 mx-auto">
                {solutions[openIndex].icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 text-center text-blue-400 break-words max-w-full">{t(`solutions.sectors.${solutions[openIndex].sector}.title`)}</h3>
              <p className="text-white/80 leading-relaxed mb-3 sm:mb-4 text-center text-sm sm:text-base break-words max-w-full">{t(`solutions.sectors.${solutions[openIndex].sector}.details`)}</p>
              <div className="service-features border-t border-white/10 pt-3 sm:pt-4 mb-3 sm:mb-4">
                <table className="w-full text-xs sm:text-sm text-white/80">
                  <tbody>
                    <tr className="border-b border-white/20">
                      <td className="font-semibold pr-2 align-top py-2 w-1/2">{t(`solutions.sectors.${solutions[openIndex].sector}.models.company.name`)}</td>
                      <td className="py-2 pl-2 align-top w-1/2">{t(`solutions.sectors.${solutions[openIndex].sector}.models.company.desc`)}</td>
                    </tr>
                    <tr className="border-b border-white/20">
                      <td className="font-semibold pr-2 align-top py-2 w-1/2">{t(`solutions.sectors.${solutions[openIndex].sector}.models.startup.name`)}</td>
                      <td className="py-2 pl-2 align-top w-1/2">{t(`solutions.sectors.${solutions[openIndex].sector}.models.startup.desc`)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <a
                href="#contacto"
                className="service-button inline-flex items-center justify-center text-blue-400 font-medium mt-2 hover:text-white bg-blue-500/10 hover:bg-blue-500 transition-all duration-300 focus:outline-none rounded-lg px-4 py-2 w-full"
                data-service={t(`solutions.sectors.${solutions[openIndex].sector}.title`).toLowerCase().replace(/ /g, '-')}
                onClick={() => setOpenIndex(null)}
              >
                {t('solutions.inquire')}
                <span className="button-icon ml-2">→</span>
              </a>
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-16 animate-fade-in">
          <button 
            onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gradient"
          >
            {t('solutions.discover')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Solutions;