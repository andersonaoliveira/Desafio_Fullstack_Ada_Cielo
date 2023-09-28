import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ClientesCadastrados() {
  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState(null);
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

  const handleApagarCliente = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/clientes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedClientes = clientes.filter((cliente) => cliente.id !== id);
        setClientes(updatedClientes);
      } else {
        console.error('Erro ao apagar cliente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleAtualizarCliente = (id) => {
    navigate(`/atualizacao-cadastro/${id}`);
  };
  
  return (
    <div>
      <h1>Clientes Cadastrados</h1>
      {erro ? (
        <p>{erro}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>MCC</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Tipo</th>
              <th>CNPJ</th>
              <th>Razão Social</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
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
                  <button onClick={() => handleApagarCliente(cliente.id)}>Apagar</button>
                  <button onClick={() => handleAtualizarCliente(cliente.id)}>Atualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClientesCadastrados;