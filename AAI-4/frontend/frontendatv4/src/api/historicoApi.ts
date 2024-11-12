import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Change to match your server URL
});

export const fetchHistoricoCompras = async () => {
  const response = await api.get('/historico');
  return response.data;
};

export const createHistoricoCompras = async (data: {
  produtoNome: string;
  fornecedorNome: string;
  quantidade: number;
}) => {
  const response = await api.post('/historico', data);
  return response.data;
};
