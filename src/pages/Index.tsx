import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Solutions from '@/components/Solutions';
import Products from '@/components/Products';
import AIValueStreams from '@/components/AIValueStreams';
import Projects from '@/components/Projects';
import Clients from '@/components/Clients';
import About from '@/components/About';
import PartnersCarousel from '@/components/PartnersCarousel';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <PartnersCarousel />
        <Solutions />
        <Products />
        <AIValueStreams />
        <Projects />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
