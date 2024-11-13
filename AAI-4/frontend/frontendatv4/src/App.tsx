import React, { useState } from 'react';
import HistoricoList from './components/HistoricoList';
import AddHistoricoForm from './components/AddHistoricoForm';
import ProductSelector from './components/productSelector';

const App: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  return (
    <div className="App">
      <h1>Histórico de Compras</h1>
      <ProductSelector onSelect={setSelectedProductId} />
      <AddHistoricoForm />
      {selectedProductId && <HistoricoList productId={selectedProductId} />}
    </div>
  );
};

export default App;
