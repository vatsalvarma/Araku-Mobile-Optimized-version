import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ParallaxDivider.css';

gsap.registerPlugin(ScrollTrigger);

const ParallaxDivider: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    let ctx = gsap.context(() => {
      
      // Smooth GSAP background parallax effect
      gsap.fromTo(bgRef.current, 
        { y: "-15%" },
        { 
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", // Starts when top of section hits bottom of viewport
            end: "bottom top",   // Ends when bottom of section hits top of viewport
            scrub: true
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="parallax-divider" ref={sectionRef}>
      <div className="parallax-divider-bg" ref={bgRef} style={{ backgroundImage: `url(${import.meta.env.BASE_URL}valley.png)` }} />
    </section>
  );
};

export default ParallaxDivider;
