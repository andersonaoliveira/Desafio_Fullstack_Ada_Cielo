import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CadastroCliente from './pages/CadastroCliente';
import ClientesCadastrados from './pages/ClientesCadastrados';
import AtualizacaoCadastro from './pages/AtualizacaoCadastro';
import ProximoClienteDaFila from './pages/ProximoClienteDaFila';
import Login from './pages/Login';
import VisualizacaoFilaDeEspera from './pages/VisualizacaoFilaDeEspera';
import Index from './pages/Index';

function MinhasRotas() {
    return (
      <Router>
        <Routes>
          <Route path="/cadastro-cliente" element={<CadastroCliente />} />
          <Route path="/atualizacao-cadastro/:id" element={<AtualizacaoCadastro />} />
          <Route path="/proximo-cliente-da-fila" element={<ProximoClienteDaFila />} />
          <Route path="/visualizacao-fila-de-espera" element={<VisualizacaoFilaDeEspera />} />
          <Route path="/clientes-cadastrados" element={<ClientesCadastrados />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    );
}

export default MinhasRotas;
