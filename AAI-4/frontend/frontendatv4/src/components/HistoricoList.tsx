import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHistoricoCompras } from '../api/historicoApi';

type HistoricoListProps = {
  productId: number;
};

const HistoricoList: React.FC<HistoricoListProps> = ({ productId }) => {
  const { data, error, isLoading } = useQuery({ queryKey:['historicoCompras', productId], queryFn: () => fetchHistoricoCompras(productId)
});
  console.log(data)
  if (!productId) return <div>Please select a product to view its sales history.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading history</div>;

  return (
    <div>
      <h2>Sales History for Selected Product</h2>
      {data.length ? (
        <ul>
          {data.map((record: any) => (
            <li key={record.id}>
              Supplier: {record.fornecedorNome}, Quantity: {record.quantidade}
            </li>
          ))}
        </ul>
      ) : (
        <p>No sales history available for this product.</p>
      )}
    </div>
  );
};

export default HistoricoList;
