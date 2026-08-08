import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ReverseScrollSection.css';

gsap.registerPlugin(ScrollTrigger);

const ReverseScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
        }
      });

      // The container starts at left: -300vw.
      // Translating it positive 300vw creates the reverse (right-to-left) scroll effect!
      const scrollDistance = scrollContainerRef.current!.scrollWidth - window.innerWidth;
      
      tl.to(scrollContainerRef.current, {
        x: scrollDistance + "px",
        ease: "none",
      }, 0);

      // Frame Parallax: EXTREME speed! Frames sweep heavily across the screen
      const maskFrames = gsap.utils.toArray('.mask-frame', scrollContainerRef.current);
      maskFrames.forEach((frame) => {
        tl.fromTo(frame as HTMLElement,
          { x: "-40vw" },
          { x: "40vw", ease: "none" },
          0
        );
      });

      // Image Parallax Effect: Image moves at maximum possible speed inside the frame!
      // (Using mathematically calculated xPercent to safely cover the entire 200% width)
      const maskImages = gsap.utils.toArray('.mask-image', scrollContainerRef.current);
      maskImages.forEach((img) => {
        tl.fromTo(img as HTMLElement, 
          { xPercent: -25, yPercent: -50, scale: 1 }, 
          { xPercent: -75, yPercent: -50, scale: 1, ease: "none" }, 
          0
        );
      });

      // Parallax for Big Titles to give depth
      const titles = gsap.utils.toArray('.reverse-big-title', scrollContainerRef.current);
      titles.forEach((title) => {
        tl.fromTo(title as HTMLElement,
          { x: "5vw" },
          { x: "-5vw", ease: "none" },
          0
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="reverse-section" ref={sectionRef}>
      <div className="reverse-sticky-content">
        {/* Container is positioned at left: -300vw */}
        <div className="reverse-container" ref={scrollContainerRef}>
          
          {/* PANEL 1: Seen LAST (End of Lookbook) */}
          <div className="reverse-panel">
            <div className="panel-content">
              <h1 className="reverse-big-title title-center">THE<br/>EXPERIENCE</h1>
              <div className="panel-color-shape shape-pink"></div>
              
              <div className="mask-frame frame-center">
                <img src={`${import.meta.env.BASE_URL}lookbook_cup.png`} className="mask-image" alt="Coffee Cups" />
              </div>

              <div className="reverse-text-block text-bottom-right">
                <span className="reverse-subtitle">SAVOR</span>
                <p>Minimalist moments captured in time. Every sip tells the story of the valley.</p>
              </div>
            </div>
          </div>

          {/* PANEL 2: Seen THIRD */}
          <div className="reverse-panel">
            <div className="panel-content">
              <h1 className="reverse-big-title title-left">THE<br/>BREW</h1>
              <div className="panel-color-shape shape-blue"></div>
              
              {/* Overlapping Frames for Lookbook Aesthetic */}
              <div className="mask-frame frame-top-right">
                <img src={`${import.meta.env.BASE_URL}lookbook_machine.png`} className="mask-image" alt="Espresso Machine" />
              </div>
              <div className="mask-frame frame-bottom-left-small">
                <img src={`${import.meta.env.BASE_URL}lookbook_farmer.png`} className="mask-image" alt="Coffee Farmer" />
              </div>

              <div className="reverse-text-block text-bottom-right">
                <span className="reverse-subtitle">PRECISION</span>
                <p>From the farmer's hands to the metallic precision of modern brewing.</p>
              </div>
            </div>
          </div>

          {/* PANEL 3: Seen SECOND */}
          <div className="reverse-panel">
            <div className="panel-content">
              <h1 className="reverse-big-title title-right">THE<br/>CRAFT</h1>
              <div className="panel-color-shape shape-yellow"></div>
              
              <div className="mask-frame frame-center-left">
                <img src={`${import.meta.env.BASE_URL}lookbook_barista.png`} className="mask-image" alt="Barista Pouring" />
              </div>

              <div className="reverse-text-block text-top-right">
                <span className="reverse-subtitle">ARTISTRY</span>
                <p>An elegant pour. The culmination of a thousand small, perfect decisions.</p>
              </div>
            </div>
          </div>

          {/* PANEL 4: Seen FIRST (Start of Lookbook) */}
          <div className="reverse-panel">
            <div className="panel-content">
              <h1 className="reverse-big-title title-center" style={{ top: '30%' }}>THE<br/>LOOKBOOK<br/>SEASON 020</h1>
              <div className="panel-color-shape shape-green"></div>
              
              <div className="mask-frame frame-bottom-right">
                <img src={`${import.meta.env.BASE_URL}lookbook_farmer.png`} className="mask-image" alt="Farmer Portrait" />
              </div>
              
              <div className="reverse-text-block text-bottom-left">
                <span className="reverse-subtitle">EDITORIAL</span>
                <p>Integer id nisl nec nulla luctus lacinia non eu turpis. A visual journey through the Araku coffee experience.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReverseScrollSection;
