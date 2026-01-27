import { useEffect, useRef, memo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Tipos para las partículas y enlaces
interface Particle {
  x: number;
  y: number;
  z: number;
  color: string;
  opacity: number;
  flicker: number;
  neighbors: number[];
}

interface Link {
  verts: number[];
  stage: number;
  linked: number[];
  distances: number[];
  traveled: number;
  fade: number;
  finished: boolean;
  length: number;
}

// Configuración del efecto
const PARTICLE_COUNT = 25;
const COLOR = '#06b6d4';
const MOTION = 0.03;
const PARTICLE_SIZE_BASE = 0.8;
const PARTICLE_SIZE_MULTIPLIER = 0.4;
const LINE_WIDTH = 1.5; // Más grueso
const LINK_CHANCE = 85;
const LINK_LENGTH_MIN = 3;
const LINK_LENGTH_MAX = 5;
const LINK_OPACITY = 0.25; // Más opaco
const LINK_FADE = 120; // Más lento (el doble de tiempo)
const LINK_SPEED = 0.6; // Más lento
const FLICKER_SMOOTHING = 20;

// Utilidades
const random = (min: number, max: number, float = false): number => {
  return float 
    ? Math.random() * (max - min) + min 
    : Math.floor(Math.random() * (max - min + 1)) + min;
};

// Versión estática para móviles
const StaticStars = memo(() => (
  <div className="absolute inset-0 pointer-events-none opacity-8">
    <svg 
      viewBox="0 0 800 600" 
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Partículas estáticas */}
      <circle cx="150" cy="120" r="1" fill="#06b6d4" opacity="0.6" />
      <circle cx="300" cy="180" r="1.2" fill="#06b6d4" opacity="0.7" />
      <circle cx="500" cy="140" r="0.8" fill="#3b82f6" opacity="0.5" />
      <circle cx="650" cy="200" r="1" fill="#3b82f6" opacity="0.6" />
      <circle cx="200" cy="300" r="1.1" fill="#06b6d4" opacity="0.8" />
      <circle cx="400" cy="250" r="1.3" fill="#06b6d4" opacity="0.9" />
      <circle cx="600" cy="320" r="0.9" fill="#3b82f6" opacity="0.6" />
      <circle cx="750" cy="380" r="1" fill="#3b82f6" opacity="0.5" />
      <circle cx="100" cy="400" r="0.8" fill="#06b6d4" opacity="0.4" />
      <circle cx="350" cy="450" r="1.1" fill="#06b6d4" opacity="0.7" />
      <circle cx="550" cy="480" r="1" fill="#3b82f6" opacity="0.6" />

      {/* Conexiones sutiles */}
      <path d="M300,180 L400,250" stroke="#06b6d4" strokeWidth="1.2" opacity="0.2" />
      <path d="M400,250 L600,320" stroke="#06b6d4" strokeWidth="1.2" opacity="0.2" />
      <path d="M200,300 L400,250" stroke="#06b6d4" strokeWidth="1.2" opacity="0.15" />
      <path d="M400,250 L350,450" stroke="#06b6d4" strokeWidth="1.2" opacity="0.15" />
    </svg>
  </div>
));

StaticStars.displayName = 'StaticStars';

// Versión animada para desktop
const AnimatedStars = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const linksRef = useRef<Link[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Intersection Observer para detectar si la sección Hero está visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          // Si vuelve a ser visible, reinicia la animación si estaba pausada
          if (entry.isIntersecting && !animationRef.current) {
            animate();
          }
        });
      },
      {
        threshold: 0.1, // Se considera visible si al menos 10% está en pantalla
        rootMargin: '50px' // Margen adicional para empezar/parar antes
      }
    );

    // Observar la sección Hero
    const heroSection = document.querySelector('#inicio');
    if (heroSection) {
      observer.observe(heroSection);
    }

    // Inicializar partículas
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({
          x: random(-0.1, 1.1, true),
          y: random(-0.1, 1.1, true),
          z: random(0, 4, true),
          color: COLOR,
          opacity: random(0.2, 0.9, true),
          flicker: 0,
          neighbors: []
        });
      }

      // Calcular vecinos (simplificado - conexiones por proximidad)
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.forEach((other, j) => {
          if (i !== j) {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 0.3 && particle.neighbors.length < 4) {
              particle.neighbors.push(j);
            }
          }
        });
      });
    };

    // Calcular posición con efecto parallax
    const getPosition = (x: number, y: number, z: number) => {
      const width = canvas.width;
      const height = canvas.height;
      return {
        x: (x * width) + ((((width / 2) - mouseRef.current.x) * z) * MOTION),
        y: (y * height) + ((((height / 2) - mouseRef.current.y) * z) * MOTION)
      };
    };

    // Renderizar partícula
    const renderParticle = (particle: Particle) => {
      const pos = getPosition(particle.x, particle.y, particle.z);
      const r = ((particle.z * PARTICLE_SIZE_MULTIPLIER) + PARTICLE_SIZE_BASE) * 
                (Math.min(canvas.width, canvas.height) / 1000);

      // Efecto flicker
      const newVal = random(-0.5, 0.5, true);
      particle.flicker += (newVal - particle.flicker) / FLICKER_SMOOTHING;
      particle.flicker = Math.max(-0.5, Math.min(0.5, particle.flicker));
      
      let opacity = particle.opacity + particle.flicker;
      opacity = Math.max(0, Math.min(1, opacity));

      context.fillStyle = particle.color;
      context.globalAlpha = opacity;
      context.beginPath();
      context.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
      context.fill();
      context.globalAlpha = 1;
    };

    // Iniciar nuevo enlace
    const startLink = (vertex: number, length: number) => {
      linksRef.current.push({
        verts: [vertex],
        stage: 0,
        linked: [vertex],
        distances: [],
        traveled: 0,
        fade: 0,
        finished: false,
        length
      });
    };

    // Renderizar enlace
    const renderLink = (link: Link) => {
      const particles = particlesRef.current;
      
      switch (link.stage) {
        case 0: { // Recolección de vértices
          const last = particles[link.verts[link.verts.length - 1]];
          if (last?.neighbors?.length > 0) {
            const neighbor = last.neighbors[random(0, last.neighbors.length - 1)];
            if (!link.verts.includes(neighbor)) {
              link.verts.push(neighbor);
            }
          }

          if (link.verts.length >= link.length) {
            // Calcular distancias
            for (let i = 0; i < link.verts.length - 1; i++) {
              const p1 = particles[link.verts[i]];
              const p2 = particles[link.verts[i + 1]];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              link.distances.push(Math.sqrt(dx * dx + dy * dy));
            }
            link.stage = 1;
          }
          break;
        }

        case 1: { // Animación de línea
          const points: [number, number][] = [];
          
          // Puntos ya conectados
          for (let i = 0; i < link.linked.length; i++) {
            const p = particles[link.linked[i]];
            const pos = getPosition(p.x, p.y, p.z);
            points.push([pos.x, pos.y]);
          }

          const linkSpeedRel = LINK_SPEED * 0.001 * canvas.width;
          link.traveled += linkSpeedRel;
          const d = link.distances[link.linked.length - 1];

          if (link.traveled >= d) {
            link.traveled = 0;
            link.linked.push(link.verts[link.linked.length]);
            const p = particles[link.linked[link.linked.length - 1]];
            const pos = getPosition(p.x, p.y, p.z);
            points.push([pos.x, pos.y]);

            if (link.linked.length >= link.verts.length) {
              link.stage = 2;
            }
          } else {
            // Interpolación
            const a = particles[link.linked[link.linked.length - 1]];
            const b = particles[link.verts[link.linked.length]];
            const t = d - link.traveled;
            const x = ((link.traveled * b.x) + (t * a.x)) / d;
            const y = ((link.traveled * b.y) + (t * a.y)) / d;
            const z = ((link.traveled * b.z) + (t * a.z)) / d;
            const pos = getPosition(x, y, z);
            points.push([pos.x, pos.y]);
          }

          // Dibujar línea
          if (points.length > 1) {
            context.globalAlpha = LINK_OPACITY;
            context.beginPath();
            context.strokeStyle = COLOR;
            context.lineWidth = LINE_WIDTH;
            for (let i = 0; i < points.length - 1; i++) {
              context.moveTo(points[i][0], points[i][1]);
              context.lineTo(points[i + 1][0], points[i + 1][1]);
            }
            context.stroke();
            context.globalAlpha = 1;
          }
          break;
        }

        case 2: { // Fade out
          if (link.fade < LINK_FADE) {
            link.fade++;
            const alpha = (1 - (link.fade / LINK_FADE)) * LINK_OPACITY;
            const points: [number, number][] = [];
            
            for (let i = 0; i < link.verts.length; i++) {
              const p = particles[link.verts[i]];
              const pos = getPosition(p.x, p.y, p.z);
              points.push([pos.x, pos.y]);
            }

            if (points.length > 1 && alpha > 0) {
              context.globalAlpha = alpha;
              context.beginPath();
              context.strokeStyle = COLOR;
              context.lineWidth = LINE_WIDTH;
              for (let i = 0; i < points.length - 1; i++) {
                context.moveTo(points[i][0], points[i][1]);
                context.lineTo(points[i + 1][0], points[i + 1][1]);
              }
              context.stroke();
              context.globalAlpha = 1;
            }
          } else {
            link.finished = true;
          }
          break;
        }
      }
    };

    // Loop de animación
    const animate = () => {
      // Solo animar si la sección Hero está visible
      if (!isVisibleRef.current) {
        animationRef.current = undefined;
        return;
      }

      // Redimensionar canvas
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);

      // Limpiar
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Renderizar partículas
      particlesRef.current.forEach(renderParticle);

      // Posiblemente iniciar nuevo enlace
      if (random(0, LINK_CHANCE) === LINK_CHANCE) {
        const length = random(LINK_LENGTH_MIN, LINK_LENGTH_MAX);
        const start = random(0, particlesRef.current.length - 1);
        startLink(start, length);
      }

      // Renderizar enlaces existentes
      linksRef.current = linksRef.current.filter(link => {
        if (!link.finished) {
          renderLink(link);
          return true;
        }
        return false;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Listener de mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    // Inicializar
    initParticles();
    mouseRef.current = { 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2 
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-18"
      style={{ background: 'transparent' }}
    />
  );
});

AnimatedStars.displayName = 'AnimatedStars';

// Componente principal
const NeuronaAnimation = () => {
  const isMobile = useIsMobile();

  // En móviles no mostrar nada para mejor rendimiento
  if (isMobile) {
    return null;
  }

  return <AnimatedStars />;
};

export default NeuronaAnimation;
