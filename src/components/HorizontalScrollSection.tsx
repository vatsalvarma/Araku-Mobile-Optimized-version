import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HorizontalScrollSection.css';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    // We have 4 panels, so the container is 400vw wide.
    // We want to translate it by -300vw (so the 4th panel stops on screen).
    let ctx = gsap.context(() => {
      
      const panels = gsap.utils.toArray('.horizontal-panel', scrollContainerRef.current);
      const titles = gsap.utils.toArray('.panel-big-title', scrollContainerRef.current);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
        }
      });

      // Move the entire container left
      tl.to(scrollContainerRef.current, {
        x: () => -(scrollContainerRef.current!.scrollWidth - window.innerWidth) + "px",
        ease: "none",
      }, 0);

      // Parallax 1: Extreme Mask Parallax Effect
      const maskFrames = gsap.utils.toArray('.horiz-mask-frame', scrollContainerRef.current);
      const maskImages = gsap.utils.toArray('.horiz-mask-image', scrollContainerRef.current);

      maskFrames.forEach((frame) => {
        tl.fromTo(frame as HTMLElement,
          { x: "35vw" },
          { x: "-35vw", ease: "none" },
          0
        );
      });

      maskImages.forEach((img) => {
        tl.fromTo(img as HTMLElement, 
          { xPercent: -75, yPercent: -50, scale: 1 }, 
          { xPercent: -25, yPercent: -50, scale: 1, ease: "none" }, 
          0
        );
      });

      // Parallax 2: Big titles move slightly slower leftwards (they translate right relative to the container)
      titles.forEach((title) => {
        tl.fromTo(title as HTMLElement,
          { x: "-5vw" },
          { x: "5vw", ease: "none" },
          0
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="horizontal-section" ref={sectionRef}>
      <div className="horizontal-sticky-content">
        <div className="horizontal-container" ref={scrollContainerRef}>
          
          {/* Panel 1: The Valley */}
          <div className="horizontal-panel">
            <div className="panel-content">
              <h1 className="panel-big-title title-center" style={{ top: '25%' }}>THE<br/>VALLEY</h1>
              <div className="horiz-mask-frame frame-right">
                <img src={`${import.meta.env.BASE_URL}editorial_valley.png`} className="horiz-mask-image" alt="Araku Valley" />
              </div>
              <div className="panel-text-block text-bottom-left">
                <span className="panel-subtitle">ORIGIN</span>
                <p>Nestled in the Eastern Ghats, our coffee begins its journey in pristine altitudes. Grown in rich red laterite soil, every bean absorbs the pure essence of the mountains.</p>
              </div>
            </div>
          </div>

          {/* Panel 2: The Harvest */}
          <div className="horizontal-panel panel-alt">
            <div className="panel-content">
              <h1 className="panel-big-title title-right">THE<br/>HARVEST</h1>
              <div className="horiz-mask-frame frame-left">
                <img src={`${import.meta.env.BASE_URL}editorial_harvest.png`} className="horiz-mask-image" alt="Coffee Harvest" />
              </div>
              <div className="panel-text-block text-bottom-right">
                <span className="panel-subtitle">SELECTION</span>
                <p>Handpicked by tribal farmers, selecting only the ripest crimson cherries. This careful selection process ensures that only the most vibrant flavors make the cut.</p>
              </div>
            </div>
          </div>

          {/* Panel 3: The Process */}
          <div className="horizontal-panel">
            <div className="panel-content">
              <h1 className="panel-big-title">THE<br/>PROCESS</h1>
              <div className="horiz-mask-frame frame-center">
                <img src={`${import.meta.env.BASE_URL}editorial_drying.png`} className="horiz-mask-image" alt="Drying Beans" />
              </div>
              <div className="panel-text-block text-top-left">
                <span className="panel-subtitle">CRAFT</span>
                <p>Sun-dried and meticulously sorted to ensure a flawless flavor profile. Our natural processing methods preserve the delicate, fruity notes of the Araku terroir.</p>
              </div>
            </div>
          </div>

          {/* Panel 4: The Roast */}
          <div className="horizontal-panel panel-alt">
            <div className="panel-content">
              <h1 className="panel-big-title title-center">THE<br/>ROAST</h1>
              <div className="horiz-mask-frame frame-right">
                <img src={`${import.meta.env.BASE_URL}editorial_roasting.png`} className="horiz-mask-image" alt="Roasting Coffee" />
              </div>
              <div className="panel-text-block text-bottom-left">
                <span className="panel-subtitle">CULMINATION</span>
                <p>Artisanally roasted in small batches to unleash the perfect symphony of aromas. Each roast profile is carefully tailored to highlight the beans' natural sweetness.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
