import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StorySection.css';

gsap.registerPlugin(ScrollTrigger);

const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && sectionRef.current) {
      // Text stagger reveal
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%', // Trigger as it slides over the previous section
          }
        }
      );

      // Paragraph scrub reveal
      const words = contentRef.current.querySelectorAll('.reveal-word');
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 40%',
              end: '+=400',
              scrub: true,
            }
          }
        );
      }
    }
  }, []);

  return (
    <section className="story-section" ref={sectionRef}>
      <div className="story-content" ref={contentRef}>
        <h4 className="story-subtitle">THE VISION</h4>
        <h2 className="story-title">The whole valley,<br/>in one store.</h2>
        
        <p className="story-paragraph reveal-text" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
          {"Araku Store is the home for everything special the Araku Valley produces — grown on tribal farms high in the Eastern Ghats, brought honestly to Telugu homes.".split(' ').map((word, i) => (
            <span key={i} className="reveal-word">{word}</span>
          ))}
        </p>
        
        <p className="story-paragraph italic-text">
          We're opening the store with coffee. The rest of the valley follows, tin by tin.
        </p>
      </div>
    </section>
  );
};

export default StorySection;
