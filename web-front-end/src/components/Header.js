import React, { useEffect } from 'react';
import { scrollToElement, navigateTo } from '../utils';

function Header({ fontSizeIndex, adjustFontSize }) {
  const toggleFontSize = () => {
    adjustFontSize();
  };

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
    <header>
      <nav>
        <ul>
          <li>
            <button onClick={() => scrollToElement('conteudo')}>Ir para o conteúdo [1]</button>
          </li>
          <li>
            <button onClick={() => scrollToElement('nav-menu')}>Ir para o menu [2]</button>
          </li>
          <li>
            <button onClick={() => scrollToElement('rodape')}>Ir para o rodapé [3]</button>
          </li>
          <li>
            <button onClick={() => navigateTo('/acessibilidade')}>Acessibilidade [4]</button>
          </li>
          <li>
            <button onClick={toggleFontSize}>A+/A- [5]</button>
          </li>
          <li>
            <button>Alto contraste [6]</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
            
