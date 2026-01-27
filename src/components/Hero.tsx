

import { ArrowRight } from 'lucide-react';
import { NeuronaAnimation } from './animations';
import { useLanguage } from '@/hooks/use-language';
import { useEffect, useState } from 'react';

const Hero = () => {
  const { t } = useLanguage();

  // Subtítulos fade: obtener array de subtítulos dinámicamente según idioma
  const [subtitles, setSubtitles] = useState<string[]>([]);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const newSubtitles = t('hero.subtitles', { returnObjects: true }) as string[];
    setSubtitles(newSubtitles);
    setSubtitleIndex(0); // Reiniciar al cambiar idioma
  }, [t]);

  useEffect(() => {
    const timeout = setTimeout(() => setFade(false), 3200);
    return () => clearTimeout(timeout);
  }, [subtitleIndex]);

  useEffect(() => {
    if (!fade) {
      const timeout = setTimeout(() => {
        setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
        setFade(true);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [fade, subtitles.length]);
  
  const scrollToContact = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Offset responsivo para la neurona (negativo sube, positivo baja)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const neuronaOffset = isMobile ? -50 : -100; // Subirla más para mejor visibilidad

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animación de neurona de fondo - solo en la parte superior */}
      <div
        className="absolute top-0 left-0 right-0 h-3/4 z-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
        style={{ marginTop: `${neuronaOffset}px` }}
      >
        <div className="w-full max-w-3xl h-full flex items-center justify-center">
          <NeuronaAnimation />
        </div>
      </div>
      {/* Decorative gradient orbs 
      <div className="gradient-orb w-96 h-96 -top- -left-48 floating-element" />
      <div className="gradient-orb w-80 h-80 -bottom-40 -right-40 floating-element" style={{ animationDelay: '2s' }} />
      <div className="gradient-orb w-64 h-64 top-1/3 right-1/4 floating-element" style={{ animationDelay: '4s' }} />
    */}
      {/* Content */}
  <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-16 sm:pt-24 md:pt-32">
        <div className="animate-fade-in">

          <h1 className="hero-title mb-6">
            <span className="text-gradient">{t('hero.title')}</span>
          </h1>

          <div className="relative h-12 mb-8 flex items-center justify-center max-w-3xl mx-auto">
            {subtitles.map((text, idx) => (
              <span
                key={idx}
                className={`absolute left-0 right-0 transition-opacity duration-500 ${idx === subtitleIndex && fade ? 'opacity-100' : 'opacity-0'} text-xl md:text-2xl text-white/80 leading-relaxed`}
                style={{
                  transitionProperty: 'opacity',
                  pointerEvents: idx === subtitleIndex ? 'auto' : 'none',
                }}
              >
                {text}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToContact}
              className="btn-hero group"
            >
              {t('hero.buttons.letsTalk')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => document.querySelector('#soluciones')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              {t('hero.buttons.viewSolutions')}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;