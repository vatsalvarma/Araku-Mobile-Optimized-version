import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HarvestSection.css';

gsap.registerPlugin(ScrollTrigger);

const HarvestSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const forestRef = useRef<HTMLImageElement>(null);
  const manContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const topLeftTextRef = useRef<HTMLDivElement>(null);
  const bottomRightTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !forestRef.current || !manContainerRef.current || !topLeftTextRef.current || !bottomRightTextRef.current) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
        }
      });

      // Background is entirely static and full size (no zoom)
      gsap.set(forestRef.current, { scale: 1, x: 0, y: 0 });

      // Top-Left Text reveals early in the scroll
      tl.fromTo(topLeftTextRef.current,
        { opacity: 0, y: "5vh" },
        { opacity: 1, y: "0vh", ease: "power2.out" },
        0
      );

      // Foreground man container moves dynamically across the forest
      gsap.set(manContainerRef.current, { x: "-50%", y: "40vh", rotation: 5 });

      tl.to(manContainerRef.current, {
        y: "-40vh", // Move up across the forest
        x: "-60%", // Drift slightly left
        rotation: -5, // Slight sway
        ease: "none"
      }, 0);

      // Beans fly from outside the screen into the basket AFTER the man stops moving
      const beans = gsap.utils.toArray('.harvest-bean', sectionRef.current);
      
      tl.fromTo(beans, 
        {
          x: () => (Math.random() - 0.5) * 150 + "vw", // Scatter outside/edges
          y: () => (Math.random() - 0.5) * 150 + "vh",
          scale: () => Math.random() * 0.5 + 0.8,
          rotation: () => Math.random() * 360,
          opacity: 0,
        },
        {
          x: "12vh", // Shifted further right (was 7vh)
          y: "0vh", // Kept the same height
          scale: 0.6,
          rotation: () => Math.random() * 180,
          opacity: 1,
          stagger: 0.03, // Slight delay between each bean landing
          ease: "power2.out"
        }
      ); // Removed 0 parameter to sequence it sequentially

      // Bottom-Right Text reveals after the beans fly in
      tl.fromTo(bottomRightTextRef.current,
        { opacity: 0, y: "5vh" },
        { opacity: 1, y: "0vh", ease: "power2.out" }
      );

      // Add a subtle darkening overlay towards the very end
      if (overlayRef.current) {
        tl.to(overlayRef.current, {
          opacity: 0.6,
          ease: "power2.inOut"
        }, "-=0.2"); // Starts near the end of the bean animation
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="harvest-section" ref={sectionRef}>
      <div className="harvest-sticky-content">
        
        {/* Background Forest Layer */}
        <img 
          src={`${import.meta.env.BASE_URL}forest.png`} 
          alt="Coffee Forest Top View" 
          className="harvest-forest" 
          ref={forestRef} 
        />

        {/* Foreground Man & Beans Layer */}
        <div className="harvest-man-container" ref={manContainerRef}>
          <img 
            src={`${import.meta.env.BASE_URL}man.png`} 
            alt="Coffee Harvester" 
            className="harvest-man" 
          />
          {Array.from({ length: 12 }).map((_, i) => (
            <img 
              key={i}
              src={`${import.meta.env.BASE_URL}single_bean.png`}
              className="harvest-bean"
              alt="bean"
            />
          ))}
        </div>

        {/* Shadow Overlay for smooth transition */}
        <div className="harvest-overlay" ref={overlayRef}></div>

        {/* Floating Typography */}
        <div className="harvest-text-top-left" ref={topLeftTextRef}>
          <h2 className="harvest-title">Fresh from<br/>the Farm</h2>
          <p className="harvest-desc">
            Handpicked with care by our farmers in the Eastern Ghats.
          </p>
        </div>

        <div className="harvest-text-bottom-right" ref={bottomRightTextRef}>
          <h2 className="harvest-title">Straight to<br/>your House</h2>
          <p className="harvest-desc">
            Delivering pure, unadulterated flavors directly to your cup.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HarvestSection;
