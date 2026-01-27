import { useLanguage } from '@/hooks/use-language';
import { Card } from './ui/card';
import { Code, FileText, Building, Palette, TestTube, Shield } from 'lucide-react';

const AIValueStreams = () => {
  const { t } = useLanguage();

  const streams = [
    {
      id: 'aiBuilders',
      icon: Code,
      title: t('aiValueStreams.streams.aiBuilders.title'),
      shortDesc: t('aiValueStreams.streams.aiBuilders.shortDesc'),
      domain: t('aiValueStreams.streams.aiBuilders.domain')
    },
    {
      id: 'productDefinition',
      icon: FileText,
      title: t('aiValueStreams.streams.productDefinition.title'),
      shortDesc: t('aiValueStreams.streams.productDefinition.shortDesc'),
      domain: t('aiValueStreams.streams.productDefinition.domain')
    },
    {
      id: 'swArchitecture',
      icon: Building,
      title: t('aiValueStreams.streams.swArchitecture.title'),
      shortDesc: t('aiValueStreams.streams.swArchitecture.shortDesc'),
      domain: t('aiValueStreams.streams.swArchitecture.domain')
    },
    {
      id: 'uxDesign',
      icon: Palette,
      title: t('aiValueStreams.streams.uxDesign.title'),
      shortDesc: t('aiValueStreams.streams.uxDesign.shortDesc'),
      domain: t('aiValueStreams.streams.uxDesign.domain')
    },
    {
      id: 'testAutomation',
      icon: TestTube,
      title: t('aiValueStreams.streams.testAutomation.title'),
      shortDesc: t('aiValueStreams.streams.testAutomation.shortDesc'),
      domain: t('aiValueStreams.streams.testAutomation.domain')
    },
    {
      id: 'fraudDetection',
      icon: Shield,
      title: t('aiValueStreams.streams.fraudDetection.title'),
      shortDesc: t('aiValueStreams.streams.fraudDetection.shortDesc'),
      domain: t('aiValueStreams.streams.fraudDetection.domain')
    }
  ];

  return (
    <section id="ai-value-streams" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{t('aiValueStreams.title')}</span>
          </h2>
          <p className="text-xl sm:text-2xl text-white/70 mt-4 max-w-3xl mx-auto">
            {t('aiValueStreams.description')}
          </p>
          <p className="text-lg text-white/60 mt-6 max-w-4xl mx-auto leading-relaxed">
            {t('aiValueStreams.subtitle')}
          </p>
        </div>

        {/* Grid de cards simplificadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {streams.map((stream) => {
            const IconComponent = stream.icon;
            return (
              <Card
                key={stream.id}
                className="about-card-glow relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:scale-[1.02]"
              >
                <div className="p-6">
                  {/* Icono y título */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-700/20 rounded-lg flex items-center justify-center mr-4 border border-cyan-400/30">
                      <IconComponent className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold bg-gradient-to-r from-slate-200 via-white to-cyan-200 bg-clip-text text-transparent">
                        {stream.title}
                      </h3>
                      <span className="text-xs text-cyan-400 font-medium">
                        {stream.domain}
                      </span>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {stream.shortDesc}
                  </p>

                  {/* Botón de contacto */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-400 border border-cyan-400/30 rounded-lg text-sm font-medium hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-purple-600/30 hover:border-cyan-400/50 transition-all duration-300"
                    >
                      {t('aiValueStreams.button')}
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AIValueStreams;
