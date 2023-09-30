import React, { useState, useEffect } from 'react';

const Notificacao = ({ mensagem, tipo, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return show ? (
    <div className={`alert alert-${tipo}`} role="alert">
      {mensagem}
    </div>
  ) : null;
};

export default Notificacao;
