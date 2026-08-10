import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onImagesLoaded: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onImagesLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const IMAGES_TO_PRELOAD = [
    'Araku_logo.png',
    'basket.png',
    'cb2.jpg',
    'cb3.jpg',
    'cup2.png',
    'editorial_drying.png',
    'editorial_harvest.png',
    'editorial_roasting.png',
    'editorial_valley.png',
    'forest.png',
    'hrv.png',
    'lookbook_barista.png',
    'lookbook_cup.png',
    'lookbook_farmer.png',
    'lookbook_machine.png',
    'man.png',
    'valley.png',
    'single_bean.png',
    'M1.png',
    'bg.png',
    'bg2.png',
    'bg3.png',
    'bg4.png',
    'bgg4.png',
    'box.png',
    'l1.png',
    'l2.png',
    'l3.png'
  ];

  useEffect(() => {
    // 0. Premium Initial Entrance
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
    }, "-=1.2");

    // 1. True Image Preloader
    let loadedCount = 0;
    const totalImages = IMAGES_TO_PRELOAD.length;
    let hasFinished = false;

    const minLoadTime = 2500; // Enforce premium intro time
    const startTime = Date.now();

    const finishLoading = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsed);
      
      setTimeout(() => {
        // Notify App to mount heavy components
        onImagesLoaded();
        
        // Wait a tiny bit for DOM to mount and GSAP to parse, then morph
        setTimeout(() => {
          // Fade and slide out the progress elements
          gsap.to([progressContainerRef.current, progressTextRef.current], {
            opacity: 0,
            y: -15, 
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
            delay: 0.3 
          });
          
          // Shrink the logo perfectly into the notch
          gsap.to(logoRef.current, {
            width: '110px',
            duration: 1.8,
            ease: 'expo.inOut',
            delay: 0.3
          });
        }, 300);
      }, remainingTime);
    };

    const updateProgress = () => {
      loadedCount++;
      const p = Math.round((loadedCount / totalImages) * 100);
      setProgress(p);
      gsap.to(barRef.current, { width: `${p}%`, duration: 0.3 });
      
      if (loadedCount === totalImages && !hasFinished) {
        hasFinished = true;
        finishLoading();
      }
    };

    // Fallback timer just in case network hangs forever (max 10s wait)
    const fallbackTimer = setTimeout(() => {
      if (!hasFinished) {
        hasFinished = true;
        finishLoading();
      }
    }, 10000);

    IMAGES_TO_PRELOAD.forEach(src => {
      const img = new Image();
      img.src = import.meta.env.BASE_URL + src;
      img.onload = updateProgress;
      img.onerror = updateProgress; // Advance even if error to prevent infinite hang
    });

    return () => clearTimeout(fallbackTimer);
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
