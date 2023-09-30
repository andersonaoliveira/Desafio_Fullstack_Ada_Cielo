import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Notificacao from '../components/Notificacao';

function AtualizacaoCadastro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [clienteEditado, setClienteEditado] = useState({
    nome: '',
    email: '',
    mcc: '',
    cpf: '',
    telefone: '',
    tipo: '',
    cnpj: '',
    razaoSocial: '',
  });
  const [erro, setErro] = useState(null);
  const [notificacao, setNotificacao] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/clientes/${id}`);

        if (response.ok) {
          const data = await response.json();
          setCliente(data);
          setClienteEditado(data);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClienteEditado({
      ...clienteEditado,
      [name]: value,
    });
  };

  const handleCloseNotificacao = () => {
    setNotificacao(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteEditado),
      });

      if (response.ok) {
        setNotificacao('Dados do cliente atualizados com sucesso');
        navigate('/clientes-cadastrados');
      } else {
        console.error('Erro ao atualizar os dados do cliente');
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
    }
  };

  return (
    <div>
      <h1>Atualização de Cadastro</h1>
      {erro ? (
        <p>{erro}</p>
      ) : cliente ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={clienteEditado.nome}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={clienteEditado.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={clienteEditado.telefone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="mcc">Mcc:</label>
            <input
              type="text"
              id="mcc"
              name="mcc"
              value={clienteEditado.mcc}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Salvar Alterações</button>
        </form>
      ) : (
        <p>Carregando...</p>
      )}
      {notificacao && (
        <Notificacao
          mensagem={notificacao}
          tipo="success"
          onClose={handleCloseNotificacao}
        />
      )}
    </div>
  );
}

export default AtualizacaoCadastro;