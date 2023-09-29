import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CadastroCliente from './pages/CadastroCliente';
import ClientesCadastrados from './pages/ClientesCadastrados';
import AtualizacaoCadastro from './pages/AtualizacaoCadastro';
import ProximoClienteDaFila from './pages/ProximoClienteDaFila';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Acessibilidade from './pages/Acessibilidade';
import VisualizacaoFilaDeEspera from './pages/VisualizacaoFilaDeEspera';
import Index from './pages/Index';

//import ProtectedRoute from './ProtectedRoute';

function MinhasRotas() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
        <Route path="/atualizacao-cadastro/:id" element={<AtualizacaoCadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/acessibilidade" element={<Acessibilidade />} />
        <Route path="/" element={<Index />} />

        <Route path="/proximo-cliente-da-fila" element={<ProximoClienteDaFila />} />
        <Route path="/visualizacao-fila-de-espera" element={<VisualizacaoFilaDeEspera />} />
        <Route path="/clientes-cadastrados" element={<ClientesCadastrados />} />

        {/* <Route
          path="/proximo-cliente-da-fila"
          element={<ProtectedRoute component={<ProximoClienteDaFila />} />}
        />
        <Route
          path="/visualizacao-fila-de-espera"
          element={<ProtectedRoute component={<VisualizacaoFilaDeEspera />} />}
        />
        <Route
          path="/clientes-cadastrados"
          element={<ProtectedRoute component={<ClientesCadastrados />} />}
        /> */}
      </Routes>
    </Router>
  );
}

export default MinhasRotas;