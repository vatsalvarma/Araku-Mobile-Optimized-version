import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './BeanJourneySection.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const BeanJourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const basketRef = useRef<HTMLImageElement>(null);
  const cupRef = useRef<HTMLImageElement>(null);
  const beansRef = useRef<(HTMLImageElement | null)[]>([]);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !canvasRef.current || !basketRef.current || !cupRef.current) return;

    let ctx = gsap.matchMedia();

    ctx.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      let { isMobile } = context.conditions as { isMobile: boolean };
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
        }
      });

      // Page 1: Basket tilt and bean burst (0 to 0.2)
      tl.to(basketRef.current, {
        y: "-10vh",
        x: isMobile ? "-10vw" : "10vw",
        rotation: isMobile ? -45 : 45,
        duration: 0.2,
        ease: "power1.inOut"
      }, 0);

      // Beans burst out of basket (0.1 to 0.3)
      beansRef.current.forEach((bean, i) => {
        if (!bean) return;
        const delay = 0.1 + (i * 0.01); // staggering
        
        // Beans fall from Page 1 (approx 50vh) to Page 2 (approx 150vh)
        tl.to(bean, {
          y: "120vh", // Fall down into the cup section
          x: () => (Math.random() * 20 - 10) + "vw", // Spread out
          rotation: Math.random() * 360,
          duration: 0.3,
          ease: "power2.in"
        }, delay);
      });

      // Camera moves to Page 2 (Cup) (0.2 to 0.4)
      tl.to(canvasRef.current, {
        y: "-100vh",
        duration: 0.2,
        ease: "power1.inOut"
      }, 0.2);

      // Page 2: Cup rotation and Beans snaking (0.4 to 0.7)
      tl.to(cupRef.current, {
        rotation: 90, // Reduced from 360 for a slow, elegant rotation
        duration: 0.3,
        ease: "sine.inOut"
      }, 0.4);

      // Beans snake around the cup (0.4 to 0.7)
      beansRef.current.forEach((bean, i) => {
        if (!bean) return;
        
        // We simulate a snake path using GSAP motion path or just complex x/y bezier
        // For simplicity and stability without extra SVG, we chain tweens
        const delay = 0.4 + (i * 0.01);
        
        // Snake right around cup
        tl.to(bean, {
          x: "15vw",
          y: "150vh",
          duration: 0.1,
          ease: "sine.inOut"
        }, delay);
        
        // Snake left under cup
        tl.to(bean, {
          x: "-10vw",
          y: "180vh",
          duration: 0.1,
          ease: "sine.inOut"
        }, delay + 0.1);
        
        // Final resting place of the beans (or they fall out of view on page 2)
        tl.to(bean, {
          x: "0vw",
          y: "250vh", // Fall out of view
          duration: 0.1,
          ease: "power2.in"
        }, delay + 0.2);
      });

      // Text Reveal Animations
      const animateText = (ref: React.RefObject<HTMLDivElement | null>, time: number) => {
        if (!ref.current) return;
        tl.fromTo(ref.current.children, 
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.15, stagger: 0.05, ease: "power2.out" },
          time
        );
      };

      animateText(text1Ref, 0); // Animate immediately as scroll begins
      animateText(text2Ref, 0.3); // Animate as Page 2 comes into view

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bean-journey-section" ref={sectionRef}>
      <div className="bean-sticky-content">
        <div className="bean-canvas" ref={canvasRef}>
          
          {/* THE BEANS (Shared across all pages, absolute positioned to canvas) */}
          <div className="beans-container">
            {Array.from({ length: 15 }).map((_, i) => (
              <img 
                key={i}
                src={`${import.meta.env.BASE_URL}single_bean.png`}
                alt="Coffee Bean"
                className="journey-bean"
                ref={el => { beansRef.current[i] = el; }}
              />
            ))}
          </div>

          {/* PAGE 1: HARVEST & BASKET */}
          <div 
            className="journey-page page-1"
            style={{ 
              backgroundImage: `url(${import.meta.env.BASE_URL}cb3.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="page-left">
              <div className="harvest-image-wrapper">
                <img src={`${import.meta.env.BASE_URL}hrv.png`} alt="Harvest" className="hrv-bg" />
                <img 
                  src={`${import.meta.env.BASE_URL}basket.png`} 
                  alt="Basket" 
                  className="basket-img" 
                  ref={basketRef}
                />
              </div>
            </div>
            <div className="page-right" ref={text1Ref}>
              <h1 className="journey-hero-title">THE ORIGIN</h1>
              <p className="journey-desc">From the lush hills of Araku Valley, handpicked with care by tribal farmers. Our journey begins where nature thrives, in pristine altitudes and rich red laterite soil. Each crimson cherry is meticulously selected at the peak of ripeness to ensure that only the most vibrant, full-bodied flavors make the cut. This profound connection to the land is the heart and soul of our exceptional coffee.</p>
            </div>
          </div>

          {/* PAGE 2: CUP & SAUCER */}
          <div 
            className="journey-page page-2"
            style={{ 
              backgroundImage: `url(${import.meta.env.BASE_URL}cb2.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="page-left" ref={text2Ref}>
              <h1 className="journey-hero-title">THE BREW</h1>
              <p className="journey-desc">Roasted to perfection in small artisanal batches, creating a symphony of flavors that snake their way into your cup. Our masterful roasters carefully monitor every second of the process, unlocking the delicate fruity notes and deep chocolate undertones hidden within the beans. The result is an incredibly smooth, aromatic brew that awakens the senses and celebrates the craft.</p>
            </div>
            <div className="page-right">
              <div className="cup-wrapper">
                <img 
                  src={`${import.meta.env.BASE_URL}cup2.png`} 
                  alt="Cup and Saucer" 
                  className="journey-cup-img" 
                  ref={cupRef}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BeanJourneySection;
