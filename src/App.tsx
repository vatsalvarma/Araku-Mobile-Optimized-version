import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

gsap.registerPlugin(ScrollTrigger);

// Prevent mobile address bar resize from breaking ScrollTrigger calculations
ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded && contentRef.current) {
      // Safe GSAP fade-in that doesn't break sticky positioning on mobile
      gsap.fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });

      ScrollTrigger.refresh();
      setTimeout(() => ScrollTrigger.refresh(), 500);
      setTimeout(() => ScrollTrigger.refresh(), 1500);
    }
  }, [isLoaded]);

  return (
    <>
      <LoadingScreen onImagesLoaded={() => setIsLoaded(true)} />
      
      {isLoaded && (
        <div ref={contentRef}>
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
      )}
    </>
  );
}

export default App;

