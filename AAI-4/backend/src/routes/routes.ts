
import express from 'express';
import historicoController from '../controllers/historico';

const router = express.Router();

router
    .route('/historico')
    .get(historicoController.getLogs)
    .post(historicoController.createLog);

export default router;
