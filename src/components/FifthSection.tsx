import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FifthSection.css';

gsap.registerPlugin(ScrollTrigger);

const FifthSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const layerYellowRef = useRef<HTMLDivElement>(null);
  const layerText2Ref = useRef<HTMLDivElement>(null);
  const layerBrownRef = useRef<HTMLDivElement>(null);
  const layerText3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !layerYellowRef.current || !layerText2Ref.current || !layerBrownRef.current || !layerText3Ref.current) return;

    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
        }
      });

      // 1. Wipe in the Yellow Layer
      tl.fromTo(layerYellowRef.current,
        { clipPath: "circle(0% at -50% 50%)" },
        { clipPath: "circle(200% at -50% 50%)", duration: 1, ease: "none" }
      );
      tl.to({}, { duration: 0.1 });

      // 2. Wipe in Text Layer 2
      tl.fromTo(layerText2Ref.current,
        { clipPath: "circle(0% at -50% 50%)" },
        { clipPath: "circle(200% at -50% 50%)", duration: 1, ease: "none" }
      );
      tl.to({}, { duration: 0.1 });

      // 3. Wipe in the Brown Layer
      tl.fromTo(layerBrownRef.current,
        { clipPath: "circle(0% at -50% 50%)" },
        { clipPath: "circle(200% at -50% 50%)", duration: 1, ease: "none" }
      );
      tl.to({}, { duration: 0.1 });

      // 4. Wipe in Text Layer 3
      tl.fromTo(layerText3Ref.current,
        { clipPath: "circle(0% at -50% 50%)" },
        { clipPath: "circle(200% at -50% 50%)", duration: 1, ease: "none" }
      );
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="fifth-section" ref={sectionRef}>
      <div className="fifth-sticky-content">
        
        {/* Layer 1: Image background bb1 */}
        <div className="wipe-layer layer-1">
           {/* Replaced text with background image bb1 */}
        </div>

        {/* Layer 2: Solid yellow wipe */}
        <div className="wipe-layer layer-2" ref={layerYellowRef}></div>

        {/* Layer 3: Image background bb2 */}
        <div className="wipe-layer layer-3" ref={layerText2Ref}>
           {/* Replaced text with background image bb2 */}
        </div>

        {/* Layer 4: Solid brown wipe */}
        <div className="wipe-layer layer-4" ref={layerBrownRef}></div>

        {/* Layer 5: Image background bgg3 */}
        <div className="wipe-layer layer-5" ref={layerText3Ref}>
           {/* Replaced text with background image bgg3 */}
        </div>

      </div>
    </section>
  );
};

export default FifthSection;
