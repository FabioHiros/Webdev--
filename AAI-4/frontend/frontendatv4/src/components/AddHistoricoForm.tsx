import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHistoricoCompras } from '../api/historicoApi';
import { products, suppliers } from '../data/data';

const AddHistoricoForm: React.FC = () => {
  const [produtoNome, setProdutoNome] = useState(''); // Update to use produtoNome
  const [fornecedorNome, setFornecedorNome] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createHistoricoCompras,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historicoCompras', produtoNome] });
      // setFornecedorNome('');
      setQuantidade(1);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (produtoNome) {
      mutation.mutate({ produtoNome, fornecedorNome, quantidade });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Sales Record</h2>
      <div>
        <label>Product:</label>
        <select onChange={(e) => setProdutoNome(e.target.value)} required>
          <option value="">-- Select Product --</option>
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Supplier:</label>
        <select onChange={(e) => setFornecedorNome(e.target.value)} required>
          <option value="">-- Select Supplier --</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.name}>
              {supplier.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          min="1"
          required
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddHistoricoForm;
