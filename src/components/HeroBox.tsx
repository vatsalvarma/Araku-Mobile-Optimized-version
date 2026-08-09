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

      ctx.add("(min-width: 769px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".main-content",
            start: "top top",
            end: "+=100%",
            scrub: 1.5,
          }
        });

        tl.to(wrapperRef.current, { x: "55vw", rotation: 0, ease: "power1.inOut" }, 0);
        tl.to(wrapperRef.current, { y: "95vh", scale: 0.85, ease: "none" }, 0);

        ScrollTrigger.create({
          trigger: ".about-section",
          start: "top top",
          endTrigger: ".story-section",
          end: "top top",
          pin: wrapperRef.current,
          pinSpacing: false,
        });
      });

      ctx.add("(max-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".main-content",
            start: "top top",
            end: "+=100%",
            scrub: 1.5,
          }
        });

        tl.to(wrapperRef.current, { x: "20vw", rotation: 0, ease: "power1.inOut" }, 0);
        tl.to(wrapperRef.current, { y: "85vh", scale: 0.85, ease: "none" }, 0);

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
