import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHistoricoCompras } from '../api/historicoApi';

const AddHistoricoForm: React.FC = () => {
  const [produtoNome, setProdutoNome] = useState('');
  const [fornecedorNome, setFornecedorNome] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  const queryClient = useQueryClient();

  const mutation = useMutation({ mutationFn:createHistoricoCompras, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['historicoCompras']});
      setProdutoNome('');
      setFornecedorNome('');
      setQuantidade(1);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ produtoNome, fornecedorNome, quantidade });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Histórico de Compras</h2>
      <div>
        <label>Produto:</label>
        <input
          type="text"
          value={produtoNome}
          onChange={(e) => setProdutoNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Fornecedor:</label>
        <input
          type="text"
          value={fornecedorNome}
          onChange={(e) => setFornecedorNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Quantidade:</label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          min="1"
          required
        />
      </div>
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AddHistoricoForm;
