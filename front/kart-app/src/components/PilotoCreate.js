import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function PilotoCreate() {
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [posicao, setPosicao] = useState('');
  const [categoria, setCategoria] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const piloto = {
      nome,
      numero,
      posicao,
      categoria
    };

    fetch('http://localhost:5000/api/pilotos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(piloto)
    })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Criar Piloto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Número:</label>
          <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)} required />
        </div>
        <div>
          <label>Posição:</label>
          <input type="text" value={posicao} onChange={(e) => setPosicao(e.target.value)} required />
        </div>
        <div>
          <label>Categoria:</label>
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
        </div>
        <button type="submit">Criar</button>
        <Link to="/">Cancelar</Link>
      </form>
    </div>
  );
}

export default PilotoCreate;
