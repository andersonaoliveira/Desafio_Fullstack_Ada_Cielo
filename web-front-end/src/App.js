//import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Routes from './Routes';
import Header from './components/Header';
import './assets/styles/font-sizes.css';

function App() {
  const [fontSizeIndex, setFontSizeIndex] = useState(0);
  
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Header fontSizeIndex={fontSizeIndex} setFontSizeIndex={setFontSizeIndex} />
        </div>
        <nav id="nav-menu">
        {/* falta fazer um menu nav */}
        </nav>
        <div id="conteudo" className={`content ${fontSizeIndex === 1 ? 'large-font' : 'normal-font'}`}>
        <Routes />
        </div>
        <footer id="rodape">
  {/* Rodapé aqui */}
        </footer>
      </header>
    </div>
  );
}

export default App;
