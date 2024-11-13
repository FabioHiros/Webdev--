"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnector_1 = __importDefault(require("../dbConnector"));
class HistoricoController {
    constructor() {
        // Create a new history record
        this.createLog = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { produtoNome, fornecedorNome, quantidade } = request.body;
            try {
                const historico = yield dbConnector_1.default.historicoCompras.create({
                    data: {
                        produtoNome,
                        fornecedorNome,
                        quantidade,
                    },
                });
                response.status(201).json(historico);
            }
            catch (error) {
                console.error("Error creating record:", error);
                response.status(500).json({ error: 'Failed to add history record' });
            }
        });
        // Get all records for a specific product name
        this.getLogsByProduct = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { produtoNome } = request.query;
            try {
                const historicos = yield dbConnector_1.default.historicoCompras.findMany({
                    where: { produtoNome: String(produtoNome) },
                });
                response.json(historicos);
            }
            catch (error) {
                console.error("Error fetching history:", error);
                response.status(500).json({ error: 'Failed to fetch history' });
            }
        });
    }
}
exports.default = new HistoricoController();
