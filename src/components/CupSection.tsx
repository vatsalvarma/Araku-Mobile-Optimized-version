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

    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Lock it to the screen when it hits the top
          end: "+=200%", // Keep it locked longer so they are forced to watch it
          scrub: true, // Remove the 1-second lag, tie animation directly to scroll position
          pin: true, // This locks the screen in place so they see the full animation!
        }
      });

      const particles = gsap.utils.toArray('.cup-particle', sectionRef.current);

      // Initial state
      gsap.set(cupWrapperRef.current, { x: "-70vw" });
      gsap.set(cupRef.current, { rotation: 0 });
      gsap.set(logoRef.current, { opacity: 0, x: "-10vw" });
      gsap.set(particles, { x: 0, y: 0, scale: 0, opacity: 0, rotation: 0 });

      // 1. Cup wrapper moves from left to right
      tl.to(cupWrapperRef.current, {
        x: "20vw", 
        duration: 2,
        ease: "power2.inOut"
      });

      // 1.5 Cup image rotates inside the wrapper simultaneously
      tl.to(cupRef.current, {
        rotation: 720, 
        duration: 2,
        ease: "power2.inOut"
      }, "<"); // "<" means start at the exact same time as previous animation

      // 2. Ingredients shoot out from behind the cup just before it stops
      tl.to(particles, {
        x: (i) => {
          // Left-side semi-circle (top -> left -> bottom)
          const angle = (Math.PI / 2) + (i / (particles.length - 1)) * Math.PI;
          const distance = 10 + Math.random() * 8; // 10vw to 18vw
          return Math.cos(angle) * distance + "vw";
        },
        y: (i) => {
          const angle = (Math.PI / 2) + (i / (particles.length - 1)) * Math.PI;
          const distance = 10 + Math.random() * 8; 
          return Math.sin(angle) * distance + "vw"; // using vw for circular shape relative to screen width
        },
        scale: () => 0.6 + Math.random() * 0.4,
        rotation: () => -180 + Math.random() * 360,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.5)"
      }, "-=0.8");

      // 3. Logo reveals on the left side
      tl.to(logoRef.current, {
        opacity: 1,
        x: "-25vw", // Adjusted slightly further left so it clears the ingredients
        duration: 1,
        ease: "power2.out"
      }, "-=1.0"); 

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cup-section" ref={sectionRef}>
        
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

    </section>
  );
};

export default CupSection;
