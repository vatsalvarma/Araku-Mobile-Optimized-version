import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
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

// Prevent address bar resize from recalculating all triggers
ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll + GSAP integration
  useEffect(() => {
    if (!isLoaded) return;

    const lenis = new Lenis({
      autoRaf: false,       // We drive Lenis via GSAP ticker, not its own RAF
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 2,   // Make touch scroll responsive on mobile
    });
    lenisRef.current = lenis;

    // Connect Lenis scroll updates to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's animation ticker (single RAF loop)
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after layout settles
    setTimeout(() => ScrollTrigger.refresh(), 200);
    setTimeout(() => ScrollTrigger.refresh(), 1000);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
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
