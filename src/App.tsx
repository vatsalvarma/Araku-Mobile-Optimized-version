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

function App() {
  return (
    <>
      <LoadingScreen />
      
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
    </>
  );
}

export default App;
