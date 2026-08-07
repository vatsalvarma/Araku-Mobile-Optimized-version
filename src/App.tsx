import LoadingScreen from './components/LoadingScreen';
import AboutSection from './components/AboutSection';
import StorySection from './components/StorySection';
import FourthSection from './components/FourthSection';
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
      <CupSection />
      <FifthSection />
    </>
  );
}

export default App;
