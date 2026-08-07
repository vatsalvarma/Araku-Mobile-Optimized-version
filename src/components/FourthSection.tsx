import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FourthSection.css';

gsap.registerPlugin(ScrollTrigger);

const FourthSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const bottleRef = useRef<HTMLImageElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !logoRef.current || !bottleRef.current) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom", // Animates across the entire 300vh height
          scrub: 1, 
        }
      });

      // Logo emerges and rises from the center
      tl.fromTo(logoRef.current, 
        { scale: 0.2, opacity: 0, y: "30vh" },
        { scale: 1, opacity: 1, y: "0vh", duration: 1, ease: "none" },
        0
      );

      // Bottle comes up from the bottom of the screen
      tl.fromTo(bottleRef.current,
        { y: "100vh", opacity: 0 },
        { y: "0vh", opacity: 1, duration: 1, ease: "none" },
        0
      );

      // 2. Explosion effect on further scroll: 12 small leaves and beans
      if (particlesRef.current) {
        const particles = Array.from(particlesRef.current.children);
        const leaves = particles.filter(el => el.classList.contains('particle-leaf'));
        const beans = particles.filter(el => el.classList.contains('particle-bean'));

        // Leaves explode and FLIP (3D rotation)
        tl.fromTo(leaves,
          { scale: 0, x: 0, y: 0, rotationX: 0, rotationY: 0, rotation: 0, opacity: 0 },
          { 
            scale: () => 0.8 + Math.random() * 0.5,
            x: (_, target) => {
               const originalIndex = particles.indexOf(target as Element);
               const angle = (originalIndex / particles.length) * Math.PI * 2;
               const distance = 15 + Math.random() * 20; // 15vw to 35vw
               return Math.cos(angle) * distance + "vw";
            },
            y: (_, target) => {
               const originalIndex = particles.indexOf(target as Element);
               const angle = (originalIndex / particles.length) * Math.PI * 2;
               const distance = 15 + Math.random() * 20; // 15vh to 35vh
               return Math.sin(angle) * distance + "vh";
            },
            rotationX: () => 360 + Math.random() * 360, // Flip vertically
            rotationY: () => -180 + Math.random() * 180, // Flip horizontally
            rotation: () => -45 + Math.random() * 90, // Slight 2D tilt
            opacity: 1, 
            duration: 1, 
            ease: "power3.out"
          },
          0.8 
        );

        // Beans explode and just ROTATE (2D rotation)
        tl.fromTo(beans,
          { scale: 0, x: 0, y: 0, rotation: 0, opacity: 0 },
          { 
            scale: () => 0.8 + Math.random() * 0.5,
            x: (_, target) => {
               const originalIndex = particles.indexOf(target as Element);
               const angle = (originalIndex / particles.length) * Math.PI * 2;
               const distance = 15 + Math.random() * 20; 
               return Math.cos(angle) * distance + "vw";
            },
            y: (_, target) => {
               const originalIndex = particles.indexOf(target as Element);
               const angle = (originalIndex / particles.length) * Math.PI * 2;
               const distance = 15 + Math.random() * 20; 
               return Math.sin(angle) * distance + "vh";
            },
            rotation: () => -360 + Math.random() * 720, // Spin fast in 2D
            opacity: 1, 
            duration: 1, 
            ease: "power3.out"
          },
          0.8 
        );
      }
    }, sectionRef); // Scope the context to this section

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <section className="fourth-section" ref={sectionRef}>
      <div className="fourth-sticky-content">
        <img src={`${import.meta.env.BASE_URL}Araku_logo.png`} alt="Araku Logo" className="fourth-logo" ref={logoRef} />
        <div className="fourth-bottle-container">
          <div className="particles-container" ref={particlesRef}>
            {Array.from({ length: 12 }).map((_, i) => (
              <img 
                key={i} 
                src={i % 2 === 0 ? `${import.meta.env.BASE_URL}generated_leaf.png` : `${import.meta.env.BASE_URL}single_bean.png`}
                alt="Particle" 
                className={`fourth-particle ${i % 2 === 0 ? 'particle-leaf' : 'particle-bean'}`} 
              />
            ))}
          </div>
          <img src={`${import.meta.env.BASE_URL}bottle.png`} alt="Araku Bottle" className="fourth-bottle" ref={bottleRef} />
        </div>
      </div>
    </section>
  );
};

export default FourthSection;
