import { Request, Response } from 'express';
import prisma from '../dbConnector';

class HistoricoController {
  // Create a new history record
  public createLog = async (request: Request, response: Response) => {
    const { produtoNome, fornecedorNome, quantidade } = request.body;

    try {
      const historico = await prisma.historicoCompras.create({
        data: {
          produtoNome,
          fornecedorNome,
          quantidade,
        },
      });
      response.status(201).json(historico);
    } catch (error) {
      console.error("Error creating record:", error);
      response.status(500).json({ error: 'Failed to add history record' });
    }
  };

  // Get all records for a specific product name
  public getLogsByProduct = async (request: Request, response: Response) => {
    const { produtoNome } = request.query;
    console.log(request.query)
    try {
      const historicos = await prisma.historicoCompras.findMany({
        where: { produtoNome: String(produtoNome) },
      });
      response.json(historicos);
    } catch (error) {
      console.error("Error fetching history:", error);
      response.status(500).json({ error: 'Failed to fetch history' });
    }
  };
}

export default new HistoricoController();
