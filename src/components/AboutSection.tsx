import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Fade in the text as we scroll into view
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.5,
          stagger: 0.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%', // Trigger when top of content is 80% down the screen
          }
        }
      );
    }

    if (bottleRef.current) {
      // Bottle slides out from its hidden state in CSS
      gsap.to(
        bottleRef.current,
        {
          x: -60, // Slides smoothly out just enough to sit directly to the left of the box
          opacity: 1, // Fades in as it slides out
          duration: 1.5,
          delay: 0.2, // Small delay to wait for box to settle
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top', // Triggers when the section reaches the top, which is when the box finishes landing
            toggleActions: "play none none reverse", // Replays if they scroll back up
          }
        }
      );
    }
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-content" ref={contentRef}>
        <h2>About Us</h2>
        <p>
          Nestled deep within the Eastern Ghats, the Araku Valley is home to some of the world's most pristine and carefully nurtured coffee plantations. Our beans are cultivated by generations of tribal farmers who employ biodynamic farming practices.
        </p>
        <p>
          We believe in true harmony—between the earth and the farmers, the roaster and the bean, and ultimately, between you and your morning ritual.
        </p>
      </div>
      <img src="/bottle.png" alt="Araku Bottle" className="bottle-img" ref={bottleRef} />
    </section>
  );
};

export default AboutSection;
