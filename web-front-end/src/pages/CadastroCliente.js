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
  <div className="container" style={{ maxWidth: '80%', margin: '0 auto' }}>



<fieldset><legend><h1>CADASTRO DE CLIENTE</h1></legend>
  <form onSubmit={handleSubmit} className="row">
    <div className="col-md-4">
      <div className="form-group">
        <label htmlFor="nome">NOME COMPLETO</label>
        <input
          type="text"
          className="form-control"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
        />
      </div>
    </div>
    <div className="col-md-3">
      <div className="form-group">
        <label htmlFor="cpf">CPF</label>
        <input
          type="text"
          className="form-control"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleInputChange}
        />
      </div>
    </div>
    <div className="col-md-4">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
    </div>
    <div className="col-md-2">
      <div className="form-group">
        <label htmlFor="telefone">Telefone</label>
        <input
          type="text"
          className="form-control"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleInputChange}
        />
      </div>
    </div>
    <div className="col-md-1">
      <div className="form-group">
        <label htmlFor="mcc">MCC</label>
        <input
          type="text"
          className="form-control"
          id="mcc"
          name="mcc"
          value={formData.mcc}
          onChange={handleInputChange}
        />
      </div>
    </div>
    <div className="col-md-1">
      <div className="form-group">
        <label htmlFor="tipo">Tipo</label>
        <select
          className="form-control"
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleInputChange}
        >
          <option value="FISICA">FISICA</option>
          <option value="JURIDICA">JURIDICA</option>
        </select>
      </div>
    </div>
    <div className="col-md-3">
      <div className="form-group">
        <label htmlFor="cnpj">CNPJ</label>
        <input
          type="text"
          className="form-control"
          id="cnpj"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleInputChange}
        />
      </div>
    </div>
    <div className="col-md-4">
      <div className="form-group">
        <label htmlFor="razaoSocial">Razão Social</label>
        <input
          type="text"
          className="form-control"
          id="razaoSocial"
          name="razaoSocial"
          value={formData.razaoSocial}
          onChange={handleInputChange}
        />
      </div>
    </div>
    <div className="col-md-12">
      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </div>
  </form>
  </fieldset>
</div>
  );
}

export default CadastroCliente;