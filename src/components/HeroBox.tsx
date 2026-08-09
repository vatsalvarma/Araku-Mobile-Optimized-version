import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroBox.css';

gsap.registerPlugin(ScrollTrigger);

const HeroBox: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      let ctx = gsap.matchMedia();

      ctx.add({
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)"
      }, (context) => {
        let { isMobile } = context.conditions as { isMobile: boolean };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".main-content",
            start: "top top",
            end: "+=100%",
            scrub: 1.5,
          }
        });

        // X moves with an ease, creating the "belly" of the curve
        tl.to(wrapperRef.current, {
          x: isMobile ? "20vw" : "55vw", // Prevent moving too far right on mobile
          rotation: 0,
          ease: "power1.inOut"
        }, 0);

        // Y moves linearly, continuously falling with the scroll
        tl.to(wrapperRef.current, {
          y: isMobile ? "85vh" : "95vh", // Prevent falling out of the bottom on mobile
          scale: 0.85,
          ease: "none"
        }, 0);

        // Pin the box in place while scrolling through the about section
        ScrollTrigger.create({
          trigger: ".about-section",
          start: "top top",
          endTrigger: ".story-section",
          end: "top top",
          pin: wrapperRef.current,
          pinSpacing: false,
        });
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="hero-box-wrapper" ref={wrapperRef}>
      <img src={`${import.meta.env.BASE_URL}box.png`} alt="Araku Premium Box" className="hero-box-img" />
    </div>
  );
};

export default HeroBox;
