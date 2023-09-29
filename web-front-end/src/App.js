import React, { useState } from 'react';
import './App.css';
import Routes from './Routes';
import Header from './components/Header';
import Title from './components/Title';
import Nav from './components/Nav';
import Footer from './components/Footer';
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
      <header>
        <Header fontSizeIndex={fontSizeIndex} adjustFontSize={adjustFontSize} />
      </header>
      <div class="table-responsive">
      <table border="0" table-layout = "auto">
      <tr>
      <td colspan="4" align="center"><section id="titulo"><Title /></section></td>
      </tr>
      <tr>
      <td rowspan="3" colspan="1"><section id="nav-menu"><Nav /></section></td>
      <td rowspan="3" colspan="3"><section id="conteudo" className={
              fontSizeIndex === 0
              ? 'normal-font'
              : fontSizeIndex === 1
              ? 'middle-font'
              : fontSizeIndex === 2
              ? 'large-font'
              : ''
          }
        >
          <Routes />
        </section></td></tr></table></div>
      <footer id="rodape">
        <Footer />
      </footer>
    </div>
  );
}

export default App;