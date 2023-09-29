import React, { useEffect, useCallback } from 'react';
import { scrollToElement, navigateTo } from '../utils';
import '../assets/styles/header.css';

function Header({ adjustFontSize }) {
  const toggleFontSize = useCallback(() => {
    adjustFontSize();
  }, [adjustFontSize]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.altKey && event.key >= '1' && event.key <= '6') {
        const buttonIndex = parseInt(event.key) - 1;
        const buttons = document.querySelectorAll('button');
        if (buttons[buttonIndex]) {
          buttons[buttonIndex].click();
        }
      } else if (event.altKey && event.key === '5') {
        toggleFontSize();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleFontSize]);

  return (
    <div className="header">
    <div className="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">MENU DE ACESSIBILIDADE</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Alterna navegação">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <button onClick={() => scrollToElement('conteudo')} type="button" class="btn btn-sm btn-primary">Ir para o conteúdo [1]</button>
          </li>&nbsp;&nbsp;
          <li class="nav-item">
            <button onClick={() => scrollToElement('nav-menu')} type="button" class="btn btn-sm btn-primary">Ir para o menu [2]</button>
          </li>&nbsp;&nbsp;
          <li class="nav-item">
            <button onClick={() => scrollToElement('rodape')} type="button" class="btn btn-sm btn-primary">Ir para o rodapé [3]</button>
          </li>&nbsp;&nbsp;
          <li class="nav-item">
            <button onClick={() => navigateTo('/acessibilidade')} type="button" class="btn btn-sm btn-primary">Acessibilidade [4]</button>
          </li>&nbsp;&nbsp;
          <li class="nav-item">
            <button onClick={toggleFontSize} type="button" class="btn btn-sm btn-primary">A+/A- [5]</button>
          </li>&nbsp;&nbsp;
          <li class="nav-item">
            <button onClick={() => navigateTo('/')} type="button" class="btn btn-sm btn-primary">Alto contraste [6]</button>
          </li>
        </ul>
      </div>
    </nav>
    </div>
    </div>
  );
}

export default Header;
            
