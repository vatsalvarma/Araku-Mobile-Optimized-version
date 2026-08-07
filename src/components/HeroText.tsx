import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './HeroText.css';

const HeroText: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // The loading screen animation takes about ~5.5s to fully complete the notch.
    // We start revealing this text at 5.0s so it appears smoothly alongside the notch transition.
    
    if (titleRef.current) {
       gsap.fromTo(titleRef.current.querySelectorAll('.hero-word'), 
         { opacity: 0, y: 60, filter: 'blur(15px)' },
         { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.8, stagger: 0.15, ease: 'expo.out', delay: 5.0 }
       );
    }

    if (descRef.current) {
      // Fade in base opacity
       gsap.fromTo(descRef.current,
         { opacity: 0, y: 30 },
         { opacity: 1, y: 0, duration: 2, ease: 'expo.out', delay: 5.8 }
       );
       
       // Scrub reveal for words on scroll
       const words = descRef.current.querySelectorAll('.reveal-word');
       if (words.length > 0) {
         gsap.fromTo(
           words,
           { opacity: 0.2 },
           {
             opacity: 1,
             stagger: 0.1,
             ease: 'none',
             scrollTrigger: {
               trigger: ".main-content",
               start: "top top",
               end: "+=300",
               scrub: true,
             }
           }
         );
       }
    }
    
    // On scroll parallax fade out
    if (titleRef.current && descRef.current) {
      gsap.to([titleRef.current, descRef.current], {
        y: -100,
        opacity: 0,
        filter: 'blur(10px)',
        ease: 'none',
        scrollTrigger: {
          trigger: ".main-content",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, []);

  return (
    <div className="hero-text-container">
      <h1 className="hero-title" ref={titleRef}>
        <div className="title-line">
          {"The whole valley,".split(' ').map((word, idx) => (
            <span key={`l1-${idx}`} className="hero-word">{word}&nbsp;</span>
          ))}
        </div>
        <div className="title-line">
          {"in one store.".split(' ').map((word, idx) => (
            <span key={`l2-${idx}`} className="hero-word brand-color">{word}&nbsp;</span>
          ))}
        </div>
      </h1>
      <p className="hero-desc reveal-text" ref={descRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
        {"Araku Store is the home for everything special the Araku Valley produces — grown on tribal farms high in the Eastern Ghats, brought honestly to Telugu homes. We're opening the store with coffee. The rest of the valley follows, tin by tin.".split(' ').map((word, idx) => (
          <span key={idx} className="reveal-word">{word}</span>
        ))}
      </p>
    </div>
  );
};

export default HeroText;
