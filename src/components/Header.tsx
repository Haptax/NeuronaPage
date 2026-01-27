import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import neuronaLogo from '@/assets/neurona-logo-completo.png';
import { useLanguage } from '@/hooks/use-language';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentLanguage, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame para mejor performance
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
      });
    };

    // Throttle scroll events para mejor performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const menuItems = [
    { name: t('header.menu.home'), href: '#inicio' },
    { name: t('header.menu.solutions'), href: '#soluciones' },
    { name: t('header.menu.products'), href: '#productos' },
    { name: t('header.menu.projects'), href: '#proyectos' },
    { name: t('header.menu.contact'), href: '#contacto' },
  ];

  const scrollToSection = (href: string) => {
    try {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Usar scroll suave pero con fallback
        if ('scrollBehavior' in document.documentElement.style) {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        } else {
          // Fallback para navegadores más antiguos
          window.scrollTo(0, offsetPosition);
        }
      }
    } catch (error) {
      console.warn('Error during scroll:', error);
    }
    
    // Cerrar el menú después del scroll con un pequeño delay
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-background/95 shadow-lg backdrop-blur-md' : 'bg-background/80 backdrop-blur-sm'
      } border-b border-white/10`}
      style={{ isolation: 'isolate' }}
    >
  <div className="w-full max-w-screen mx-auto px-2 sm:px-4 lg:px-8 overflow-x-hidden">
        <nav className="flex items-center justify-between min-h-[3.5rem] sm:min-h-[4rem] md:min-h-[4.5rem]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              src={neuronaLogo} 
              alt="Neurona" 
              className="h-8 w-auto md:h-10 object-contain transition-all duration-300" 
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => changeLanguage(currentLanguage === 'es' ? 'en' : 'es')}
              className="px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Globe size={18} />
              {currentLanguage === 'es' ? 'EN' : 'ES'}
            </button>
            <button 
              onClick={() => scrollToSection('#contacto')}
              className="btn-hero text-sm"
            >
              {t('header.buttons.letsTalk')}
              <span className="ml-2">→</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 w-full max-w-screen overflow-x-hidden">
            <div className="flex flex-col space-y-2 w-full max-w-screen overflow-x-hidden">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors rounded-md"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex items-center justify-between px-4 pt-4 mt-2 border-t border-white/10">
                <button
                  onClick={() => changeLanguage(currentLanguage === 'es' ? 'en' : 'es')}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Globe size={18} />
                  {currentLanguage === 'es' ? 'EN' : 'ES'}
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('#contacto');
                    setIsMenuOpen(false);
                  }}
                  className="btn-hero text-sm"
                >
                  {t('header.buttons.letsTalk')}
                  <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
