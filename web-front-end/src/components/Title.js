import React from 'react';
import logo from '../assets/images/logo.png'; 

function Title() {
  return (
    <div className="title-container">
        <br></br><br></br>
      <img src={logo} alt="Logo da Cielo" style={{ maxWidth: '20%' }} />
      <h1>Como área de Comercialização da Cielo</h1>
    </div>
  );
}

export default Title;