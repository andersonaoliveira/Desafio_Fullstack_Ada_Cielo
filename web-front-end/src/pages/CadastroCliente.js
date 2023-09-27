import React, { useState } from 'react';

function CadastroCliente() {
  const [formData, setFormData] = useState({
    nome: '',
    mcc: '',
    cpf: '',
    email: '',
    telefone: '',
    tipo: '',
    cnpj: '',
    razaoSocial: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const data = {
      cnpj: formData.cnpj,
      razaoSocial: formData.razaoSocial,
      mcc: formData.mcc,
      cpf: formData.cpf,
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      tipo: formData.tipo,
    };

    try {
      const response = await fetch('http://localhost:8080/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Dados do cliente enviados com sucesso');
      } else {
        console.error('Erro ao enviar os dados do cliente');
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
    }
  };

  return (
    <div>
      <h1>Cadastro de Cliente</h1>
      <form onSubmit={handleSubmit} method="POST">
      <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          MCC:
          <input
            type="text"
            name="mcc"
            value={formData.mcc}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          CPF:
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Telefone:
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Tipo:
          <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          CNPJ:
          <input
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Razão Social:
          <input
            type="text"
            name="razaoSocial"
            value={formData.razaoSocial}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroCliente;