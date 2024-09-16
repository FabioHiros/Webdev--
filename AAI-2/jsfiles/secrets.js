"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secrets = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
class Secrets {
    constructor() {
        this.DB_HOST = process.env.DB_HOST || 'localhost';
        this.DB_USER = process.env.DB_USER || 'root';
        this.DB_PASSWORD = process.env.DB_PASSWORD || '';
        this.DB_PORT = Number(process.env.DB_PORT) || 3306;
        this.DB_NAME = process.env.DB_NAME || 'defaultdb';
    }
}
exports.secrets = new Secrets();
