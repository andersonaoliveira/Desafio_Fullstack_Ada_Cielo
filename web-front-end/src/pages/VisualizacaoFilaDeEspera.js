import React, { useState, useEffect } from 'react';

function VisualizacaoFilaDeEspera() {
  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8081/fila-de-atendimento/clientes-na-fila');
        
        if (response.ok) {
          const data = await response.json();
          setClientes(data);
          setErro(null);
        } else {
          setClientes([]);
          setErro('Erro ao buscar clientes na fila.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        setClientes([]);
        setErro('Erro na requisição.');
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Visualização de Clientes na Fila</h1>
      {erro ? (
        <p>{erro}</p>
      ) : (
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.id}>
              <h2>Cliente ID: {cliente.id}</h2>
              <p>Nome: {cliente.nome}</p>
              <p>MCC: {cliente.mcc}</p>
              <p>CPF: {cliente.cpf}</p>
              <p>Email: {cliente.email}</p>
              <p>Telefone: {cliente.telefone}</p>
              <p>Tipo: {cliente.tipo}</p>
              <p>CNPJ: {cliente.cnpj}</p>
              <p>Razão Social: {cliente.razaoSocial}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VisualizacaoFilaDeEspera;
