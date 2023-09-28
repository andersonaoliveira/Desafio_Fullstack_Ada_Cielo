import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AtualizacaoCadastro() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/clientes/${id}`);

        if (response.ok) {
          const data = await response.json();
          setCliente(data);
          setErro(null);
        } else {
          setCliente(null);
          setErro('Erro ao buscar cliente para atualização.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        setCliente(null);
        setErro('Erro na requisição.');
      }
    }

    fetchData();
  }, [id]);

  return (
    <div>
      <h1>Atualização de Cadastro</h1>
      {erro ? (
        <p>{erro}</p>
      ) : cliente ? (
        <div>
          <p>ID: {cliente.id}</p>
          <p>Nome: {cliente.nome}</p>
          <p>Email: {cliente.email}</p>
          <p>MCC: {cliente.mcc}</p>
          <p>CPF: {cliente.cpf}</p>
          <p>Telefone: {cliente.telefone}</p>
          <p>Tipo: {cliente.tipo}</p>
          <p>CNPJ: {cliente.cnpj}</p>
          <p>Razão Social: {cliente.razaoSocial}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default AtualizacaoCadastro;