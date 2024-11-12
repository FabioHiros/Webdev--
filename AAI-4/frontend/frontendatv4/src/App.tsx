import React from 'react';
import AddHistoricoForm from './components/AddHistoricoForm';
import HistoricoList from './components/HistoricoList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Histórico de Compras</h1>
      <AddHistoricoForm />
      <HistoricoList />
    </div>
  );
};

export default App;
