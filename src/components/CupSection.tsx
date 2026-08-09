import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CupSection.css';

gsap.registerPlugin(ScrollTrigger);

const CupSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cupWrapperRef = useRef<HTMLDivElement>(null);
  const cupRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cupWrapperRef.current || !cupRef.current || !logoRef.current) return;

    let ctx = gsap.matchMedia();

    ctx.add("(min-width: 769px)", () => {
      // DESKTOP ANIMATION
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
        }
      });

      const particles = gsap.utils.toArray('.cup-particle', sectionRef.current);

      gsap.set(cupWrapperRef.current, { x: "-70vw", y: 0 });
      gsap.set(cupRef.current, { rotation: 0 });
      gsap.set(logoRef.current, { opacity: 0, x: "-10vw", y: 0 });
      gsap.set(particles, { x: 0, y: 0, scale: 0, opacity: 0, rotation: 0 });

      tl.to(cupWrapperRef.current, { x: "20vw", duration: 2, ease: "power2.inOut" });
      tl.to(cupRef.current, { rotation: 720, duration: 2, ease: "power2.inOut" }, "<");

      tl.to(particles, {
        x: (i) => {
          const angle = (Math.PI / 2) + (i / (particles.length - 1)) * Math.PI;
          const distance = 10 + Math.random() * 8; 
          return Math.cos(angle) * distance + "vw";
        },
        y: (i) => {
          const angle = (Math.PI / 2) + (i / (particles.length - 1)) * Math.PI;
          const distance = 10 + Math.random() * 8; 
          return Math.sin(angle) * distance + "vw"; 
        },
        scale: () => 0.6 + Math.random() * 0.4,
        rotation: () => -180 + Math.random() * 360,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.5)"
      }, "-=0.8");

      tl.to(logoRef.current, { opacity: 1, x: "-25vw", duration: 1, ease: "power2.out" }, "-=1.0"); 
    });

    ctx.add("(max-width: 768px)", () => {
      // MOBILE ANIMATION
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
        }
      });

      const particles = gsap.utils.toArray('.cup-particle', sectionRef.current);

      gsap.set(cupWrapperRef.current, { y: "-80vh", x: 0 });
      gsap.set(cupRef.current, { rotation: 0 });
      gsap.set(logoRef.current, { opacity: 0, y: "50vh", x: 0 });
      gsap.set(particles, { x: 0, y: 0, scale: 0, opacity: 0, rotation: 0 });

      tl.to(cupWrapperRef.current, { y: "5vh", duration: 2, ease: "power2.inOut" });
      tl.to(cupRef.current, { rotation: 720, duration: 2, ease: "power2.inOut" }, "<");

      tl.to(particles, {
        x: (i) => {
          // Bottom semi-circle (right -> bottom -> left)
          const angle = (i / (particles.length - 1)) * Math.PI;
          const distance = 30 + Math.random() * 15; // wide horizontal spread
          return Math.cos(angle) * distance + "vw";
        },
        y: (i) => {
          const angle = (i / (particles.length - 1)) * Math.PI;
          const distance = 8 + Math.random() * 5; 
          // Just below the cup's edge (cup bottom is ~20vh)
          return 16 + (Math.sin(angle) * distance) + "vh"; 
        },
        scale: () => 0.4 + Math.random() * 0.4,
        rotation: () => -180 + Math.random() * 360,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.5)"
      }, "-=0.8");

      tl.to(logoRef.current, { opacity: 0.8, y: "-15vh", duration: 1, ease: "power2.out" }, "-=1.5"); 
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="cup-section" ref={sectionRef}>
      <div className="cup-sticky-content">
        
        <img 
          src={`${import.meta.env.BASE_URL}Araku_logo.png`} 
          alt="Araku Logo"
          className="cup-logo" 
          ref={logoRef} 
        />

        <div className="cup-wrapper" ref={cupWrapperRef}>
          <div className="cup-particles-container">
            {Array.from({ length: 7 }).map((_, i) => (
              <img 
                key={i}
                src={i % 2 === 0 ? `${import.meta.env.BASE_URL}generated_leaf.png` : `${import.meta.env.BASE_URL}single_bean.png`}
                alt="Ingredient"
                className={`cup-particle ${i % 2 === 0 ? 'cup-leaf' : 'cup-bean'}`}
              />
            ))}
          </div>
          <img 
            src={`${import.meta.env.BASE_URL}cup_saucer.png`} 
            alt="Araku Ceramic Cup" 
            className="cup-img" 
            ref={cupRef} 
          />
        </div>

      </div>
    </section>
  );
};

export default CupSection;
