import React, { useState, useEffect } from 'react';

function VisualizacaoFilaDeEspera() {
  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const clientesPorPagina = 1;

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

  const nextPage = () => {
    setPaginaAtual(paginaAtual + 1);
  };

  const prevPage = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const indexOfLastCliente = paginaAtual * clientesPorPagina;
  const indexOfFirstCliente = indexOfLastCliente - clientesPorPagina;
  const clientesDaPagina = clientes.slice(indexOfFirstCliente, indexOfLastCliente);

  return (
    <div>
      <div container>
      <div class="row justify-content-center">
      <h1>Visualização de Clientes na Fila</h1>
      </div></div>
      {erro ? (
        <p>{erro}</p>
      ) : (
        <div>
          <div class="row justify-content-center">
          <div class="col-md-6">
            <table  class="table">
            {clientesDaPagina.map((cliente) => (
              <div key={cliente.id}>
                <tr><td>Cliente ID:</td><td>{cliente.id}</td></tr>
                <tr><td>Nome:</td><td>{cliente.nome}</td></tr>
                <tr><td>MCC:</td><td>{cliente.mcc}</td></tr>
                <tr><td>CPF:</td><td>{cliente.cpf}</td></tr>
                <tr><td>Email:</td><td>{cliente.email}</td></tr>
                <tr><td>Telefone:</td><td>{cliente.telefone}</td></tr>
                <tr><td>Tipo:</td><td>{cliente.tipo}</td></tr>
                <tr><td>CNPJ:</td><td>{cliente.cnpj}</td></tr>
                <tr><td>Razão Social:</td><td>{cliente.razaoSocial}</td></tr>
              </div>
            ))}<tr>
          <div>
            <button onClick={prevPage} disabled={paginaAtual === 1}>
              Página Anterior
            </button>
            <button onClick={nextPage} disabled={clientes.length <= indexOfLastCliente}>
              Próxima Página
            </button>
            </div>
            </tr>            
            </table></div>
          </div></div>
        )}
      </div>
  );
}

export default VisualizacaoFilaDeEspera;