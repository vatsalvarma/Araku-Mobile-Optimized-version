import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroBox.css';

gsap.registerPlugin(ScrollTrigger);

const HeroBox: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      // Create a timeline connected to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main-content", // Watch the hero section
          start: "top top", // Start when we begin scrolling
          end: "+=100%", // End when we've scrolled down a full viewport height
          scrub: 1.5, // Smooth, slightly delayed scrub for premium feel
        }
      });

      // Curved Path Magic:
      // We animate X and Y together with different easings.
      
      // X moves with an ease, creating the "belly" of the curve
      tl.to(wrapperRef.current, {
        x: "55vw", // Move to the right side
        rotation: 0, // Kept perfectly straight per user request
        ease: "power1.inOut"
      }, 0);

      // Y moves linearly, continuously falling with the scroll
      tl.to(wrapperRef.current, {
        y: "95vh", // Move down further to land beautifully in the middle of the About section
        scale: 0.85, // Shrink slightly
        ease: "none"
      }, 0);

      // Pin the box in place while scrolling through the about section
      ScrollTrigger.create({
        trigger: ".about-section", // Start pinning when about section reaches top
        start: "top top",
        endTrigger: ".story-section", // Stop pinning when story section reaches top
        end: "top top",
        pin: wrapperRef.current,
        pinSpacing: false, // Don't add extra space
      });
    }
  }, []);

  return (
    <div className="hero-box-wrapper" ref={wrapperRef}>
      <img src={`${import.meta.env.BASE_URL}box.png`} alt="Araku Premium Box" className="hero-box-img" />
    </div>
  );
};

export default HeroBox;
