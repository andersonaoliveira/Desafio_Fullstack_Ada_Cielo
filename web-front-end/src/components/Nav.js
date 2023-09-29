import React from 'react';

function Nav() {
  return (
    <div className="row">
      <div className="col-3">
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="/" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
          <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="/cadastro-cliente" role="tab" aria-controls="v-pills-profile" aria-selected="false">Cadastro de Cliente</a>
          <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="/clientes-cadastrados" role="tab" aria-controls="v-pills-messages" aria-selected="false">Clientes Cadastrados</a>
          <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="/visualizacao-fila-de-espera" role="tab" aria-controls="v-pills-settings" aria-selected="false">Fila de Espera</a>
        </div>
      </div>
      <div className="col-9">
        <div className="tab-content" id="v-pills-tabContent">
          <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
          <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
          <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
          <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
