import './App.css';
import { GlassNavbar } from './components/GlassNavbar';
import { Hero } from './components/Hero';
import { MenuGrid } from './components/MenuGrid';
import { AboutAndFooter } from './components/AboutAndFooter';

function App() {
  return (
    <div className="app">
      <GlassNavbar />
      <main>
        <Hero />
        <MenuGrid />
        <AboutAndFooter />
      </main>
    </div>
  );
}

export default App;
