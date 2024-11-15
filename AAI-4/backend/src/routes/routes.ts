
import express from 'express';
import historicoController from '../controllers/historico';

const router = express.Router();

router
    .route('/historico')
    .get(historicoController.getLogsByProduct)
    .post(historicoController.createLog);

export default router;
