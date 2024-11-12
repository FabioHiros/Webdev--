"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const historico_1 = __importDefault(require("../controllers/historico"));
const router = express_1.default.Router();
router
    .route('/historico')
    .get(historico_1.default.getLogs)
    .post(historico_1.default.createLog);
exports.default = router;
