import { useState, useEffect, useRef, memo } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useIsMobile } from '@/hooks/use-mobile';

import codegptLogo from '../assets/codegpt_logo.webp';
import escalaLogo from '../assets/escala.webp';
import primeurLogo from '../assets/Primeur.webp';
import coheteVideo from '../assets/cohete.mp4';

// Componente optimizado para partículas
const OptimizedParticles = memo(() => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
    {/* Partículas principales reducidas */}
    <div className="absolute top-[15%] left-[20%] w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
    <div className="absolute top-[30%] right-[15%] w-1.5 h-1.5 bg-purple-400 rounded-full opacity-45 animate-pulse" style={{animationDelay: '1s'}}></div>
    <div className="absolute bottom-[35%] left-[25%] w-2 h-2 bg-pink-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
    <div className="absolute top-[65%] right-[30%] w-1 h-1 bg-cyan-400 rounded-full opacity-35 animate-pulse" style={{animationDelay: '3s'}}></div>
    <div className="absolute bottom-[20%] left-[75%] w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '4s'}}></div>
    
    {/* Partículas secundarias mínimas */}
    <div className="absolute top-[45%] left-[10%] w-0.5 h-0.5 bg-blue-300 rounded-full opacity-25 animate-pulse" style={{animationDelay: '0.5s'}}></div>
    <div className="absolute bottom-[60%] right-[50%] w-0.5 h-0.5 bg-purple-300 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2.5s'}}></div>
  </div>
));

OptimizedParticles.displayName = 'OptimizedParticles';

const Products = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  const products = [
    {
      title: 'CodeGPT',
      description: t('products.list.codegpt.description'),
      image: codegptLogo,
    },
    {
      title: 'Escala',
      description: t('products.list.escala.description'),
      image: escalaLogo,
    },
    {
      title: 'Primeur',
      description: t('products.list.primeur.description'),
      image: primeurLogo,
    },
  ];

  const [active, setActive] = useState<number | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Lazy loading con Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoVisible(true);
            setAreImagesLoaded(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <section 
      ref={sectionRef} 
      id="productos" 
      className="py-20 relative overflow-hidden"
      style={{
        contain: 'layout style paint',
        isolation: 'isolate'
      }}
    >
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in px-2">
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl max-w-full break-words">
            <span className="text-gradient">{t('products.title')}</span>
          </h2>
          <p className="text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto break-words">
            {t('products.description')}
          </p>
        </div>

  {/* Carrusel en móvil */}
  <div className="block md:hidden w-full max-w-xs sm:max-w-sm mx-auto px-2">
    <div className="flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        {areImagesLoaded ? (
          <img
            src={products[carouselIdx]?.image || coheteVideo}
            alt={products[carouselIdx]?.title || 'Cohete Video'}
            className="w-full max-w-[220px] h-auto max-h-40 object-contain rounded-xl shadow-xl p-2 mb-3 animate-fade-in transition-all duration-300"
            style={{
              filter: 'brightness(0) invert(1) opacity(0.9)',
            }}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full max-w-[220px] h-40 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl flex items-center justify-center mb-3">
            <div className="text-white/50 text-xs">Cargando...</div>
          </div>
        )}
        <h3 className="text-lg font-bold mb-2 text-center break-words max-w-full bg-gradient-to-r from-slate-200 via-white to-cyan-200 bg-clip-text text-transparent">
          {products[carouselIdx]?.title}
        </h3>
        <p className="leading-relaxed text-sm text-center break-words max-w-full text-slate-300/90">
          {products[carouselIdx]?.description}
        </p>
      </div>
      {/* Paginación */}
      <div className="flex gap-2 mt-4">
        {products.map((_, idx) => (
          <button
            key={idx}
            className={`w-2.5 h-2.5 rounded-full border border-white/30 ${carouselIdx === idx ? 'bg-blue-400' : 'bg-white/20'} transition-colors`}
            onClick={() => setCarouselIdx(idx)}
            aria-label={`Ver producto ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  </div>

  {/* Layout actual en desktop */}
  <div className="hidden md:flex flex-col md:flex-row gap-8 lg:gap-12 w-full items-start">
    {/* Lista de productos */}
    <div className="flex-1 flex flex-col gap-4 group/products items-start w-full">
      {products.map((product, index) => (
        <div
          key={product.title}
          className={
            `product-card-glow relative bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-4 transition-all duration-300 cursor-pointer text-left w-full ` +
            `group-hover/products:opacity-70 group-hover/products:hover:opacity-100 hover:-translate-y-1`
          }
          style={{ 
            animationDelay: `${index * 0.15}s`,
            willChange: 'transform, opacity',
            isolation: 'isolate'
          }}
          onMouseEnter={() => setActive(index)}
          onMouseLeave={() => setActive(null)}
        >
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-slate-200 via-white to-cyan-200 bg-clip-text text-transparent drop-shadow-sm">
              {product.title}
            </h3>
            <p className="leading-relaxed text-sm text-slate-300/90 hover:text-slate-200/95 transition-colors duration-300">
              {product.description}
            </p>
          </div>
          {/* Línea futurista sutil al lado */}
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
    {/* Contenedor de imagen */}
    <div className="flex-1 flex items-center justify-center self-center mt-6 md:mt-0 min-h-[400px] w-full md:max-w-[500px] lg:max-w-[600px]">
      <div className="relative w-full max-w-full">
        {typeof active === 'number' && products[active] ? (
          areImagesLoaded ? (
            <div className="product-card-glow">
              <img
                src={products[active].image}
                alt={products[active].title}
                className="w-full h-auto max-h-[450px] object-contain animate-fade-in transition-all duration-500 drop-shadow-2xl"
                style={{
                  filter: 'brightness(0) invert(1) opacity(0.9)',
                  willChange: 'transform'
                }}
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : (
            <div className="w-full h-auto max-h-[450px] bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg flex items-center justify-center">
              <div className="text-white/50 text-sm">Cargando imagen...</div>
            </div>
          )
        ) : (
          <div className="relative group/video">
            {/* Efectos de fondo para el video */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-pink-600/20 blur-3xl rounded-full transform scale-150 opacity-50 group-hover/video:scale-175 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl rounded-full group-hover/video:opacity-20 transition-opacity duration-500"></div>
            
            {/* Video del cohete - Solo en desktop */}
            <div className="relative z-10">
              {isVideoVisible && !isMobile ? (
                <video
                  ref={videoRef}
                  src={coheteVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-auto max-h-[450px] object-contain drop-shadow-2xl transform transition-all duration-700 ease-out group-hover/video:brightness-110"
                  style={{
                    filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
                    contain: 'layout style paint',
                    willChange: 'transform, filter'
                  }}
                  onLoadedData={() => {
                    // Video cargado, se puede optimizar más aquí
                    if (videoRef.current) {
                      videoRef.current.playbackRate = 1;
                    }
                  }}
                />
              ) : (
                <div className="w-full h-auto max-h-[450px] bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg flex items-center justify-center">
                  <div className="text-white/50 text-sm">
                    {isMobile ? 'Cohete 🚀' : (isVideoVisible ? 'Cargando video...' : 'Cargando...')}
                  </div>
                </div>
              )}
            </div>
            
            {/* Efectos de partículas optimizadas - Solo en desktop */}
            {!isMobile && <OptimizedParticles />}
          </div>
        )}
      </div>
    </div>
  </div>

        {/* Additional CTA */}
        <div className="mt-12 text-center animate-fade-in px-2">
          <div className="bg-card/20 backdrop-blur-sm border border-white/10 rounded-3xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 break-words max-w-full">
              {t('products.customSection.title')}
            </h3>
            <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base break-words max-w-full">
              {t('products.customSection.description')}
            </p>
            <button 
              onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-gradient w-full sm:w-auto"
            >
              {t('products.customSection.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;