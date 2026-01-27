import { ArrowUp } from 'lucide-react';
import neuronaLogo from '@/assets/neurona-logo-completo.png';
import { useLanguage } from '@/hooks/use-language';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: t('footer.quickLinks.home'), href: '#inicio' },
    { name: t('footer.quickLinks.about'), href: '#sobre-nosotros' },
    { name: t('footer.quickLinks.solutions'), href: '#soluciones' },
    { name: t('footer.quickLinks.products'), href: '#productos' },
    { name: t('footer.quickLinks.projects'), href: '#proyectos' },
    { name: t('footer.quickLinks.clients'), href: '#clientes' },
    { name: t('footer.quickLinks.contact'), href: '#contacto' },
  ];

  const locations = [
    { city: 'Valparaiso, Chile', flag: '🇨🇱' },
    { city: 'Dubai, United Arab Emirates', flag: '🇦🇪' },
    { city: 'Tallin, Estonia', flag: '🇪🇪' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://ee.linkedin.com/company/neurona-global' },
    { name: 'Instagram', url: 'https://www.instagram.com/neurona.global/' },
    { name: 'YouTube', url: 'https://www.youtube.com/@NeuronaEnterprise/videos' },
  ];

  return (
    <footer className="bg-background/90 backdrop-blur-sm border-t border-white/10 py-12 relative overflow-hidden">
      
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img src={neuronaLogo} alt="Neurona" className="h-auto w-40" />
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              {t('footer.company.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.socialLinks.title')}</h3>
            <div className="space-y-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/70 hover:text-white transition-colors duration-300 text-sm"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.locations.title')}</h3>
            <div className="space-y-2">
              {locations.map((location) => (
                <p
                  key={location.city}
                  className="text-white/70 text-sm flex items-center gap-2"
                >
                  <span className="text-base">{location.flag}</span>
                  {location.city}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © {currentYear} Neurona. {t('footer.legal.rights')}
            </div>
            
            <div className="flex items-center gap-6">
              <button className="text-white/70 hover:text-white transition-colors text-sm">
                {t('footer.legal.privacy')}
              </button>
              <button className="text-white/70 hover:text-white transition-colors text-sm">
                {t('footer.legal.terms')}
              </button>
              <button
                onClick={scrollToTop}
                className="bg-background/50 border border-white/20 rounded-full p-2 hover:bg-background/70 transition-all duration-300 group"
              >
                <ArrowUp size={16} className="text-white group-hover:translate-y-[-2px] transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;