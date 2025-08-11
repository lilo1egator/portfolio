import './App.css';
import Starfield from './components/Starfield';
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Roadmap from './components/Roadmap/Roadmap';
import CustomCursor from './components/Cursor/CustomCursor';
import ContactForm from './components/Form/ContactForm';
import Footer from './components/Footer/Footer';
import './styles/media.scss';

function App() {
  return (
    <>
      <CustomCursor />
      <Starfield />
      <div className="App">
        <Header />
        <About />
        <Projects />
        <Roadmap />
        <Skills />
        <ContactForm />
      </div>
      <Footer />
    </>
  );
}

export default App;
