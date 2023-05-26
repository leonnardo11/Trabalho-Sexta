import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PilotoList() {
  const [pilotos, setPilotos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/pilotos/')
      .then(response => response.json())
      .then(data => {
        setPilotos(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const deletePiloto = (id) => {
    fetch(`http://localhost:5000/api/pilotos/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setPilotos(pilotos.filter(piloto => piloto._id !== id));
        } else {
          throw new Error('Erro ao deletar piloto');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Lista de Pilotos</h1>
      <Link to="/pilotos/create">Criar Piloto</Link>
      <ul>
        {pilotos.map(piloto => (
          <li key={piloto._id}>
            {piloto.nome} - {piloto.numero} - {piloto.posicao} - {piloto.categoria}
            <button onClick={() => deletePiloto(piloto._id)}>Deletar</button>
            <Link to={`/pilotos/edit/${piloto._id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PilotoList;
