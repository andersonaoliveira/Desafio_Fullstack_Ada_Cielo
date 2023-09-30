import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notificacao from '../components/Notificacao';

function ClientesCadastrados() {
  const [notificacao, setNotificacao] = useState(null);
  const [atualizacaoNotificacao, setAtualizacaoNotificacao] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const clientesPorPagina = 10;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/clientes');

        if (response.ok) {
          const data = await response.json();
          setClientes(data);
          setErro(null);
        } else {
          setClientes([]);
          setErro('Erro ao buscar clientes cadastrados.');
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

  const handleApagarCliente = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/clientes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedClientes = clientes.filter((cliente) => cliente.id !== id);
        setClientes(updatedClientes);
        setNotificacao('Cliente apagado com sucesso');
      } else {
        console.error('Erro ao apagar cliente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleAtualizarCliente = (id) => {
    setAtualizacaoNotificacao('Cliente atualizado com sucesso');
    navigate(`/atualizacao-cadastro/${id}`);
  };

  return (
    <div>
      <fieldset>
        <legend>
          <h1>Clientes Cadastrados</h1>
        </legend>
        {erro ? (
          <p>{erro}</p>
        ) : (
          <div>
            {notificacao && (
              <Notificacao
                mensagem={notificacao}
                tipo="success"
                onClose={() => setNotificacao(null)}
              />
            )}

            {atualizacaoNotificacao && (
              <Notificacao
                mensagem={atualizacaoNotificacao}
                tipo="success"
                onClose={() => setAtualizacaoNotificacao(null)}
              />
            )}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">MCC</th>
                  <th scope="col">CPF</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">CNPJ</th>
                  <th scope="col">Razão Social</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientesDaPagina.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.mcc}</td>
                    <td>{cliente.cpf}</td>
                    <td>{cliente.telefone}</td>
                    <td>{cliente.tipo}</td>
                    <td>{cliente.cnpj}</td>
                    <td>{cliente.razaoSocial}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleApagarCliente(cliente.id)}
                      >
                        Apagar
                      </button>
                      &nbsp;&nbsp;
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => handleAtualizarCliente(cliente.id)}
                      >
                        Atualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button onClick={prevPage} disabled={paginaAtual === 1}>
                Página Anterior
              </button>
              <button
                onClick={nextPage}
                disabled={clientes.length <= indexOfLastCliente}
              >
                Próxima Página
              </button>
            </div>
          </div>
        )}
      </fieldset>
    </div>
  );
}

export default ClientesCadastrados;
