import { useState, useEffect } from 'react';
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
import './App.css'; // Optional, but we'll use index.css mostly

gsap.registerPlugin(ScrollTrigger);

// CRITICAL MOBILE OPTIMIZATION:
// This prevents GSAP from breaking when the mobile address bar shows/hides!
ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // Only refresh once after the DOM paints. No continuous observers!
      setTimeout(() => ScrollTrigger.refresh(), 100);
      setTimeout(() => ScrollTrigger.refresh(), 1000);
      setTimeout(() => ScrollTrigger.refresh(), 3000);
    }
  }, [isLoaded]);

  return (
    <>
      <LoadingScreen onImagesLoaded={() => setIsLoaded(true)} />
      
      {isLoaded && (
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
      )}
    </>
  );
}

export default App;
