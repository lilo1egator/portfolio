import './App.css';
import Starfield from './components/Starfield';
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';

function App() {
  return (
    <>
      <Starfield />
      <div className="App">
        <Header />
        <About />
        <Projects />
        <Skills />
      </div>
    </>
  );
}

export default App;
