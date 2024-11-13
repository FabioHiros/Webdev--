import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Update with your backend URL
});

export const fetchHistoricoCompras = async (productName: string) => {
  const response = await api.get(`/historico?produtoNome=${productName}`);
  return response.data;
};

export const createHistoricoCompras = async ({ produtoNome, fornecedorNome, quantidade }: { produtoNome: string; fornecedorNome: string; quantidade: number; }) => {
  const response = await axios.post('http://localhost:3000/historico', {
    produtoNome,
    fornecedorNome,
    quantidade,
  });
  return response.data;
};

 