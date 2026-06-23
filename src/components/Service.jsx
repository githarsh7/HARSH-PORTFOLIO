import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: "Business Website",
    tag: "Corporate",
    color: "#648c11",
    description: "Corporate websites optimized for conversion and premium branding.",
    image: "https://i.pinimg.com/736x/18/43/16/18431673a51c54a2ed850a2ac9c46bb4.jpg"
  },
  {
    title: "Admin Dashboard",
    tag: "SaaS",
    color: "#ff4500",
    description: "Advanced dashboards with analytics and data visualization.",
    image: "https://i.pinimg.com/1200x/53/8c/93/538c938b0f2f6c2fd919e1775c2d85d2.jpg"
  },
  {
    title: "E-Commerce Store",
    tag: "Retail",
    color: "#000080",
    description: "Luxury online shopping experiences with seamless checkout.",
    image:"https://i.pinimg.com/1200x/e0/90/e4/e090e4ee77888b2ca9c9d97f303621e3.jpg"
  },
  {
    title: "Full Stack Web App",
    tag: "App",
    color: "#ff0000",
    description: "Scalable web applications with powerful backend systems.",
    image: "https://i.pinimg.com/1200x/12/c5/a0/12c5a0c1637b76464d77945aa3b5d77a.jpg"
  },
  {
    title: "Portfolio Website",
    tag: "Creative",
    color: "#eab308", 
    description: "High-end portfolio experiences for creators and agencies.",
    image: "https://i.pinimg.com/1200x/f6/39/36/f63936cd1f42671adcdd554d51c0446e.jpg"
  },
  {
    title: "Website Redesign",
    tag: "Design",
    color: "#71717a", 
    description: "Modern redesigns with immersive animations and premium UI.",
    image: "https://i.pinimg.com/736x/73/2f/6d/732f6dbac1eadd8c7a3b2d4775344a75.jpg"
  }
];

export default function Service() {
  const pinSectionRef = useRef(null);
  const triggerRef = useRef(null);
  const cardsRef = useRef([]);

  // Clear cards array ref on render
  cardsRef.current = [];

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const cards = cardsRef.current;
    const pinSection = pinSectionRef.current;
    if (cards.length === 0 || !pinSection) return;

    // Card transform logic
    const updateTransforms = (progress) => {
      const activeOffsetIndex = progress * (servicesData.length - 1);
      
      // Interpolate background color directly
      const idx = Math.round(activeOffsetIndex);
      const currentColor = servicesData[idx]?.color || '#09090b';
      pinSection.style.background = `radial-gradient(circle at center, ${currentColor}22, #09090b 80%)`;

      // Apply circular math transforms directly to card DOM elements
      cards.forEach((card, index) => {
        if (!card) return;
        const offset = index - activeOffsetIndex;
        const angle = offset * (Math.PI / 8); // 22.5 degree spacing
        const radius = 600;
        
        const tx = Math.sin(angle) * radius;
        const ty = radius - Math.cos(angle) * radius + 100; // translate offset to curve under center
        const tz = -Math.abs(offset) * 150;
        
        const rz = angle * (180 / Math.PI); // rotate to face center
        const scale = 1 - Math.abs(offset) * 0.12;
        const opacity = 1 - Math.abs(offset) * 0.28;
        const zIndex = Math.round(100 - Math.abs(offset) * 10);

        card.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateZ(${rz}deg) scale(${scale})`;
        card.style.opacity = Math.max(0, opacity);
        card.style.zIndex = zIndex;
      });
    };

    // Initialize layout before scroll
    updateTransforms(0);

    // Desktop curve ScrollTrigger
    const pin = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: '+=400%', // 500% scroll duration
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        // Run update directly on DOM nodes, bypassing React state change cycles
        updateTransforms(self.progress);
      }
    });

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div ref={triggerRef} className="relative z-10">
      <section
        id="service"
        ref={pinSectionRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center transition-colors duration-1000 bg-zinc-950"
      >
        {/* Background Overlay Outlined Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <h2 className="font-display font-extrabold text-[18vw] text-stroke opacity-10 leading-none tracking-tighter mix-blend-overlay">
            SERVICES
          </h2>
        </div>

        {/* Desktop Carousel (Curved Math using direct DOM handles) */}
        <div className="hidden md:flex relative w-full h-full items-center justify-center perspective-2000">
          {servicesData.map((service) => (
            <div
              key={service.title}
              ref={addToRefs}
              className="absolute w-[420px] h-[520px] rounded-[30px] glassmorphism p-8 flex flex-col justify-between border border-white/10 hover:border-luxury-yellow/30 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-transform duration-75 pointer-events-auto select-none overflow-hidden group"
              style={{
                transformOrigin: 'center center'
              }}
            >
              <div className="flex flex-col gap-4">
                {/* Visual Image container with zoom hover */}
                <div className="w-full h-[180px] rounded-[20px] overflow-hidden border border-white/5 bg-zinc-950/40 relative">
                  {/* Glossy / Shade Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 to-transparent z-10 pointer-events-none" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                  />
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span
                    className="text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-full border"
                    style={{ borderColor: `${service.color}55`, color: service.color }}
                  >
                    {service.tag}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-2xl text-white mt-1 leading-tight">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Corner details */}
              <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-auto">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Harshaa SG
                </span>
                <div 
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: service.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel (Horizontal Snap Slider) */}
        <div className="md:hidden flex overflow-x-auto gap-6 px-6 py-20 snap-x snap-mandatory scrollbar-none w-full z-10">
          {servicesData.map((service) => (
            <div
              key={service.title}
              className="min-w-[80vw] h-[450px] snap-center rounded-[30px] glassmorphism p-6 flex flex-col justify-between border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] group overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                <div className="w-full h-[150px] rounded-[20px] overflow-hidden border border-white/5 bg-zinc-950/40 relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                  />
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <span
                    className="text-xs font-mono tracking-widest px-3 py-1 rounded-full border border-white/10"
                    style={{ color: service.color, borderColor: `${service.color}55` }}
                  >
                    {service.tag}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-xl text-white mt-1">{service.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">{service.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Creative Service</span>
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: service.color }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
