import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ReactLenis } from 'lenis/react';

import LoadingScreen from './components/LoadingScreen';
import AboutSection from './components/AboutSection';
import StorySection from './components/StorySection';
import FourthSection from './components/FourthSection';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import ReverseScrollSection from './components/ReverseScrollSection';
import ParallaxDivider from './components/ParallaxDivider';
import HarvestSection from './components/HarvestSection';
import BeanJourneySection from './components/BeanJourneySection';
import CupSection from './components/CupSection';
import FifthSection from './components/FifthSection';
import HeroBox from './components/HeroBox';
import './App.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Prevent mobile address bar resize from breaking ScrollTrigger calculations
ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const lenisRef = useRef<any>(null);

  useGSAP(() => {
    if (!isLoaded) return;
    
    // Drive Lenis from GSAP's animation ticker for perfect synchronization
    gsap.ticker.add((time) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Refresh layout after components settle
    ScrollTrigger.refresh();
    setTimeout(() => ScrollTrigger.refresh(), 500);
    setTimeout(() => ScrollTrigger.refresh(), 1500);

    return () => {
      gsap.ticker.remove((time) => lenisRef.current?.lenis?.raf(time * 1000));
    };
  }, [isLoaded]);

  return (
    <>
      <LoadingScreen onImagesLoaded={() => setIsLoaded(true)} />
      
      {isLoaded && (
        <ReactLenis root ref={lenisRef} autoRaf={false} options={{ touchMultiplier: 2 }}>
          <div style={{ animation: 'fadeIn 1.5s forwards' }}>
            {/* Main Content Area (Hero) */}
            <main className="main-content">
              <HeroBox />
            </main>

            {/* Scrolling Sections */}
            <AboutSection />
            <StorySection />
            <FourthSection />
            <HorizontalScrollSection />
            <ParallaxDivider />
            <ReverseScrollSection />
            <HarvestSection />
            <BeanJourneySection />
            <CupSection />
            <FifthSection />
          </div>
        </ReactLenis>
      )}
    </>
  );
}

export default App;

