import { Quote } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import Coopeuch from '../assets/coopeuchNew.png';
import Xerox from '../assets/xeroxNew.png';
import librery from '../assets/libertyNew.png';
import laboratorio from '../assets/Laboratorio-DavisNew.png';
import Capitaria from '../assets/capitariaNew.png';
import Sura from '../assets/sura.png';

const Clients = () => {
  const { t } = useLanguage();
  
  const clientsData = [
    {
      logo: Coopeuch,
      name: "Coopeuch"
    },
    {
      logo: Xerox,
      name: "Xerox"
    },
    {
      logo: librery,
      name: "Liberty Seguros"
    },
    {
      logo: laboratorio,
      name: "Laboratorio Davis"
    },
    {
      logo: Capitaria,
      name: "Capitaria"
    },
    {
      logo: Sura,
      name: "Sura Seguros"
    }
  ];

  const testimonials = [
    {
      quote: t('clients.testimonials.list.victor.quote'),
      author: "Victor Corvalán",
      position: "CEO, Visionverse, Dubai, UAE"
    },
    {
      quote: t('clients.testimonials.list.jimena.quote'),
      author: "Jimena Pettinato",
      position: "CTO, Howe, CABA, Argentina"
    }
  ];

  return (
    <section id="clientes" className="relative py-20 overflow-hidden">
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl">
            Ellos confiaron en <span className="text-gradient">Neurona</span>
          </h2>
          <p className="text-xl sm:text-2xl text-white/70 mt-4 max-w-3xl mx-auto">
            Empresas líderes que confiaron en nuestras soluciones tecnológicas para impulsar su transformación digital.
          </p>
        </div>
      </div>

      {/* Logos marquee */}
      <div className="container mx-auto px-6">
        <div 
          className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 rounded-2xl" 
          style={{ 
            contain: 'layout style paint',
            willChange: 'transform'
          }}
        >
          <div className="absolute left-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />
        <div className="flex animate-marquee">
          {[...clientsData, ...clientsData, ...clientsData].map((client, index) => {
            // Apply specific filters for problematic logos
            let logoFilter = 'brightness(0) invert(1) sepia(0) saturate(0) hue-rotate(0deg) brightness(1.2)';
            
            if (client.name === 'Xerox') {
              logoFilter = 'grayscale(1) invert(1) contrast(1.8) brightness(1.3)';
            } else if (client.name === 'Liberty Seguros') {
              logoFilter = 'grayscale(1) contrast(2) brightness(1.5) invert(1)';
            }
            
            return (
            <div 
              key={index} 
              className="flex-none mx-3 sm:mx-4 md:mx-6 lg:mx-8 w-[100px] sm:w-[120px] md:w-[150px] lg:w-[180px] flex flex-col items-center justify-center group"
            >
              <div className="h-[80px] sm:h-[100px] md:h-[120px] lg:h-[140px] w-full flex items-center justify-center mb-3 sm:mb-4">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="object-contain w-full h-full opacity-85 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    filter: logoFilter,
                  }}
                />
              </div>
              <span className="text-white/70 group-hover:text-white text-xs sm:text-sm md:text-base font-medium tracking-wide transition-all duration-500 text-center">
                {client.name}
              </span>
            </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
