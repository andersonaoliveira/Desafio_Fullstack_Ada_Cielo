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
      <fieldset><legend><h1>Clientes Cadastrados</h1></legend>
      {erro ? (
        <p>{erro}</p>
      ) : (
        <table class="table table-striped">
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
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td scope="row">{cliente.id}</td>
                <td scope="row">{cliente.nome}</td>
                <td scope="row">{cliente.email}</td>
                <td scope="row">{cliente.mcc}</td>
                <td scope="row">{cliente.cpf}</td>
                <td scope="row">{cliente.telefone}</td>
                <td scope="row">{cliente.tipo}</td>
                <td scope="row">{cliente.cnpj}</td>
                <td scope="row">{cliente.razaoSocial}</td>
                <td scope="row">
                  <button type="button" class="btn btn-outline-danger" onClick={() => handleApagarCliente(cliente.id)}>Apagar</button>&nbsp;&nbsp;
                  <button type="button" class="btn btn-outline-primary" onClick={() => handleAtualizarCliente(cliente.id)}>Atualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>        
      )}
      </fieldset>
    </div>
  );
}

export default ClientesCadastrados;