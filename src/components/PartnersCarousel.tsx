import React from "react";
import { useLanguage } from '@/hooks/use-language';
import aws from '../assets/aws-logo.svg';
import codegpt from '../assets/codegpt-logo.svg';
import primeur from '../assets/primeur.svg';
import escala from '../assets/escala.svg';



const partners = [
  {
    name: "AWS",
    logo: aws,
    translationKey: "aws"
  },
  {
    name: "CodeGPT",
    logo: codegpt,
    translationKey: "codegpt"
  },
  {
    name: "Primeur",
    logo: primeur,
    translationKey: "primeur"
  },
  {
    name: "Escala",
    logo: escala,
    translationKey: "escala"
  },
];


import { useState } from "react";

const PartnersCarousel = () => {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="partners" className="py-20 bg-transparent">
  <div className="w-full px-2 sm:px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{t('partners.title')}</span> 
          </h2>
          <p className="section-description text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto mt-4">
            {t('partners.description')}
          </p>
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12 md:gap-24 items-center justify-center px-2">
          {partners.map((partner, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={partner.name + idx}
                className="flex flex-col items-center justify-center min-w-[140px] sm:min-w-[200px] md:min-w-[260px] max-w-xs rounded-xl p-3 sm:p-6 group transition-all duration-300 cursor-pointer"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:z-10 group-hover:drop-shadow-lg ${isOpen ? 'scale-110 z-10 drop-shadow-lg' : ''}`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="object-contain w-full h-full transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                {isOpen && (
                  <>
                    <h4 className="text-lg font-semibold text-white mb-2 whitespace-normal break-words">
                      {t(`partners.list.${partner.translationKey}.name`)}
                    </h4>
                    <p className="text-white/60 text-sm whitespace-normal break-words">
                      {t(`partners.list.${partner.translationKey}.description`)}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
