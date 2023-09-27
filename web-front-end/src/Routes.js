import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CadastroCliente from './pages/CadastroCliente';
import AtualizacaoCadastro from './pages/AtualizacaoCadastro';
import VisualizacaoFila from './pages/VisualizacaoFila';
import Login from './pages/Login';
import VisualizacaoClientes from './pages/VisualizacaoClientes';

function MinhasRotas() {
    return (
      <Router>
        <Routes>
          <Route path="/cadastro-cliente" element={<CadastroCliente />} />
          <Route path="/atualizacao-cadastro" element={<AtualizacaoCadastro />} />
          <Route path="/visualizacao-fila" element={<VisualizacaoFila />} />
          <Route path="/login" element={<Login />} />
          <Route path="/visualizacao-clientes" element={<VisualizacaoClientes />} />
        </Routes>
      </Router>
    );
}

export default MinhasRotas;
