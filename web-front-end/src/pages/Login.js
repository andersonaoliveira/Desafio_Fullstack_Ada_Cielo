import React, { useState } from 'react';
import '../assets/styles/login.css';
import login from '../assets/images/logo-login.png';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const token = 'seu_token_de_autenticacao';
    onLogin(token);
  };
  return (
    <div class="wrapper">
      <div className="logo">
        <img src={login} alt="Logo da Cielo" />
      </div>
    <div class="text-center mt-4 name">
        CIELO
    </div>
    <form class="p-3 mt-3">
        <div class="form-field d-flex align-items-center">
            <span class="far fa-user"></span>
            <input type="text" name="username" id="username" placeholder="Nome de Usuário">
            </input>
        </div>
        <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input type="password" name="password" id="pwd" placeholder="SENHA">
            </input>
        </div>
        <button class="btn mt-3">Login</button>
    </form>
    <div class="text-center fs-6">
        <a href="#">Esqueceu a senha?</a> or <a href="#">Sign up</a>
    </div>
</div>
  );
}

export default Login;