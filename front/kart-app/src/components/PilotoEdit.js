import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PilotoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [piloto, setPiloto] = useState({});
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [posicao, setPosicao] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/pilotos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPiloto(data);
        setNome(data.nome);
        setNumero(data.numero);
        setPosicao(data.posicao);
        setCategoria(data.categoria);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedPiloto = {
      nome: nome,
      numero: numero,
      posicao: posicao,
      categoria: categoria,
    };

    fetch(`http://localhost:5000/api/pilotos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPiloto),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Piloto atualizado:', data);
        navigate('/'); // Redirecionar para a página inicial
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Editar Piloto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label>Número:</label>
          <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)} />
        </div>
        <div>
          <label>Posição:</label>
          <input type="number" value={posicao} onChange={(e) => setPosicao(e.target.value)} />
        </div>
        <div>
          <label>Categoria:</label>
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        </div>
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}

export default PilotoEdit;
