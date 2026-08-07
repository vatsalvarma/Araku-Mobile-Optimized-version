import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 0. Premium Initial Entrance (Blur + Scale Reveal)
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8, filter: 'blur(15px)' });
    gsap.set([progressContainerRef.current, progressTextRef.current], { opacity: 0, y: 20 });
    
    const entranceTl = gsap.timeline();
    entranceTl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 2,
      ease: 'expo.out'
    })
    .to([progressContainerRef.current, progressTextRef.current], {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'expo.out',
      stagger: 0.15
    }, "-=1.2"); // Overlap with logo reveal

    // 1. Progress Bar Animation
    const loadDuration = 2.5;
    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => {
        // 2. Elegant Exit & Notch Transition
        // Fade and slide out the progress elements
        gsap.to([progressContainerRef.current, progressTextRef.current], {
          opacity: 0,
          y: -15, // Slide up slightly as they leave
          height: 0,
          margin: 0,
          duration: 0.6,
          ease: 'power3.inOut',
          stagger: 0.1,
          onComplete: () => {
            if (progressContainerRef.current) progressContainerRef.current.style.display = 'none';
            if (progressTextRef.current) progressTextRef.current.style.display = 'none';
          }
        });

        // Morph the full screen into the phone notch
        gsap.to(containerRef.current, {
          height: '60px',
          width: '180px',
          borderRadius: '0 0 24px 24px',
          duration: 1.8,
          ease: 'expo.inOut',
          delay: 0.3 // Wait a moment after progress fades out
        });
        
        // Shrink the logo perfectly into the notch
        gsap.to(logoRef.current, {
          width: '110px',
          duration: 1.8,
          ease: 'expo.inOut',
          delay: 0.3
        });
      }
    });
    
    // Animate the actual loading bar
    tl.to(barRef.current, {
      width: '100%',
      duration: loadDuration,
      ease: 'power2.inOut',
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100));
      }
    }, 0); // Start immediately relative to the timeline

  }, []);

  return (
    <div className="loading-screen" ref={containerRef}>
      <div className="loading-content">
        <img 
          src={`${import.meta.env.BASE_URL}Araku_logo.png`} 
          alt="Araku Logo" 
          className="loading-logo" 
          ref={logoRef} 
        />
        <div className="progress-container" ref={progressContainerRef}>
          <div className="progress-bar" ref={barRef}></div>
        </div>
        <div className="progress-text" ref={progressTextRef}>
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
