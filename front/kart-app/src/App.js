import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PilotoList from './components/PilotoList';
import PilotoEdit from './components/PilotoEdit';
import PilotoCreate from './components/PilotoCreate';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PilotoList />} />
        <Route exact path="/pilotos/create" element={<PilotoCreate />} />
        <Route exact path="/pilotos/edit/:id" element={<PilotoEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
