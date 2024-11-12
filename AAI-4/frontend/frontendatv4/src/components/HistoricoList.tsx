import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHistoricoCompras } from '../api/historicoApi';

const HistoricoList: React.FC = () => {
  const { data, error, isLoading } = useQuery({queryKey:['historicoCompras'],  queryFn:fetchHistoricoCompras});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading history</div>;

  return (
    <div>
      <h2>Histórico de Compras</h2>
      <ul>
        {data.map((record: any) => (
          <li key={record.id}>
            Produto: {record.produtoNome}, Fornecedor: {record.fornecedorNome}, Quantidade: {record.quantidade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoricoList;
