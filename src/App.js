import './App.css';
import Starfield from './components/Starfield';
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Moon from './components/Moon';
import Cosmo from './components/Cosmo';

function App() {
  return (
    <>
      <Starfield />
      <div className="App">
        <Header />
        <About />
        <Projects />
        <Moon />
        <Skills />
        <Cosmo />
      </div>
    </>
  );
}

export default App;
