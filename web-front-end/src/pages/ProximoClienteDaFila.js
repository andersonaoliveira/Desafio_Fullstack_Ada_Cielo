import React, { useState } from 'react';

function ProximoClienteDaFila() {
  const [cliente, setCliente] = useState(null);
  const [listaVazia, setListaVazia] = useState(false);

  const buscarProximoCliente = async () => {
    try {
      const response = await fetch('http://localhost:8081/fila-de-atendimento/proximo-cliente');
      
      if (response.status === 200) {
        const data = await response.json();
        if (data) {
          setCliente(data);
        }
      } else if (response.status === 204) {
        setListaVazia(true);
        setCliente(null);
      } else {
        console.error('Erro ao buscar próximo cliente');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const atualizarFila = () => {
    setListaVazia(false);
    buscarProximoCliente();
  };

  return (
    <div>
      <h1>Visualização de Fila de Atendimento</h1>
      {cliente ? (
        <div>
          <h2>Cliente Atual</h2>
          <p>ID: {cliente.id}</p>
          <p>Nome: {cliente.nome}</p>
          <p>MCC: {cliente.mcc}</p>
          <p>CPF: {cliente.cpf}</p>
          <p>Email: {cliente.email}</p>
          <p>Telefone: {cliente.telefone}</p>
          <p>Tipo: {cliente.tipo}</p>
          <p>CNPJ: {cliente.cnpj}</p>
          <p>Razão Social: {cliente.razaoSocial}</p>
          <button onClick={buscarProximoCliente}>Próximo</button>
        </div>
      ) : listaVazia ? (
        <div>
          <p>A lista está vazia.</p>
          <button onClick={atualizarFila}>Atualizar</button>
        </div>
      ) : (
        <button onClick={buscarProximoCliente}>Carregar Próximo Cliente</button>
      )}
    </div>
  );
}

export default ProximoClienteDaFila;
