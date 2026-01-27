import { useLanguage } from '@/hooks/use-language';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  return (
    <section id="sobre-nosotros" className="relative py-20">
      
      <div className="container mx-auto px-6">
        <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl text-center mb-16">
          {t('about.title.prefix')} <span className="text-gradient">{t('about.title.highlighted')}</span>
        </h2>
        
        {/* Description */}
        <div className="about-card-glow bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 hover:border-white/20 transition-all duration-300">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              {t('about.description.first')}
            </p>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              {t('about.description.second')}
            </p>
          </div>
        </div>

        <br />
        {/* Stats Cards */}
        <div ref={ref} className="grid grid-cols-3 gap-3 sm:gap-6 mb-12">
          <div className="about-card-glow text-center p-3 sm:p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="text-2xl sm:text-4xl font-bold text-gradient mb-1 sm:mb-2">
              {inView ? <CountUp end={100} suffix="+" duration={2.5} /> : '0+'}
            </div>
            <div className="text-white/70 text-sm sm:text-base">{t('about.stats.projects')}</div>
          </div>
          <div className="about-card-glow text-center p-3 sm:p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="text-2xl sm:text-4xl font-bold text-gradient mb-1 sm:mb-2">
              {inView ? <CountUp end={50} suffix="+" duration={2} /> : '0+'}
            </div>
            <div className="text-white/70 text-sm sm:text-base">{t('about.stats.clients')}</div>
          </div>
          <div className="about-card-glow text-center p-3 sm:p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="text-2xl sm:text-4xl font-bold text-gradient mb-1 sm:mb-2">
              {inView ? <CountUp end={15} suffix="+" duration={1.5} /> : '0+'}
            </div>
            <div className="text-white/70 text-sm sm:text-base">{t('about.stats.years')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
