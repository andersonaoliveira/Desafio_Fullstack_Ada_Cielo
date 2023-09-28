import React, { useState } from 'react';
import './App.css';
import Routes from './Routes';
import Header from './components/Header';
import './assets/styles/font-sizes.css';

function App() {
  const [fontSizeIndex, setFontSizeIndex] = useState(0);

  const adjustFontSize = () => {
    if (fontSizeIndex < 2) {
      setFontSizeIndex(fontSizeIndex + 1);
    } else {
      setFontSizeIndex(0);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Header fontSizeIndex={fontSizeIndex} adjustFontSize={adjustFontSize} />
        </div>
        <nav id="nav-menu">
          {/* falta fazer um menu nav */}
        </nav>
        <div id="conteudo" className={fontSizeIndex === 0 ? 'normal-font' : (fontSizeIndex === 1 ? 'middle-font' : fontSizeIndex === 2 ? 'large-font' : '')}>
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
