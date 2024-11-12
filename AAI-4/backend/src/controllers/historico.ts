import express, { Response, Request } from 'express';
import prisma from '../dbConnector';

class HistoricoController {
  public createLog = async (req: Request, res: Response) => {
    const { produtoNome, fornecedorNome, quantidade } = req.body;

    try {
      const historico = await prisma.historicoCompras.create({
        data: {
          produtoNome,
          fornecedorNome,
          quantidade,
        },
      });
      res.status(201).json(historico);
    } catch (error) {
      console.error("Error creating history record:", error);
      res.status(500).json({ error: "Failed to add history record" });
    }
  };

  // Add a method to get all history records
  public getLogs = async (req: Request, res: Response) => {
    try {
      const historicoRecords = await prisma.historicoCompras.findMany();
      res.json(historicoRecords);
    } catch (error) {
      console.error("Error fetching history records:", error);
      res.status(500).json({ error: "Failed to fetch history records" });
    }
  };
}

export default new HistoricoController();
