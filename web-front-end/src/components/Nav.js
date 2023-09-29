import React, { useState } from 'react';

function Nav() {
  const openHome = () => {
    window.open('/', '_self');
  };
  const openCadastrarCliente = () => {
    window.open('/cadastro-cliente', '_self');
  };
  const openClientesCadastrados = () => {
    window.open('/clientes-cadastrados', '_self');
  };
  const openFilaDeEspera = () => {
    window.open('/visualizacao-fila-de-espera', '_self');
  };
  const openProximoDaFila = () => {
    window.open('/proximo-cliente-da-fila', '_self');
  };
  const LogOut = () => {
    window.open('/login', '_self');
  };

  return (
    <div className="row">
      <div className="col-2">
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <button type="button" class="btn btn-outline-primary" onClick={openHome}>Home</button>
          <button type="button" class="btn btn-outline-primary" onClick={openCadastrarCliente}>Cadastrar Cliente</button>
          <button type="button" class="btn btn-outline-primary" onClick={openClientesCadastrados}>Clientes Cadastrados</button>
          <button type="button" class="btn btn-outline-primary" onClick={openFilaDeEspera}>Fila de Espera</button>
          <button type="button" class="btn btn-outline-primary" onClick={openProximoDaFila}>Próximo Cliente da Fila</button>
          <button type="button" class="btn btn-outline-primary" onClick={LogOut}>SAIR</button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
