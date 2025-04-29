import './App.css';
import Header from './components/Header/Header';
import About from './components/About/About';
import Starfield from './components/Starfield';

function App() {
  return (
    <>
      <Starfield />
      <div className="App">
        <Header />
        <About />
      </div>
    </>
  );
}

export default App;
