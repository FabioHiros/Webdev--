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
        this.createLog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { produtoNome, fornecedorNome, quantidade } = req.body;
            try {
                const historico = yield dbConnector_1.default.historicoCompras.create({
                    data: {
                        produtoNome,
                        fornecedorNome,
                        quantidade,
                    },
                });
                res.status(201).json(historico);
            }
            catch (error) {
                console.error("Error creating history record:", error);
                res.status(500).json({ error: "Failed to add history record" });
            }
        });
        // Add a method to get all history records
        this.getLogs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const historicoRecords = yield dbConnector_1.default.historicoCompras.findMany();
                res.json(historicoRecords);
            }
            catch (error) {
                console.error("Error fetching history records:", error);
                res.status(500).json({ error: "Failed to fetch history records" });
            }
        });
    }
}
exports.default = new HistoricoController();
