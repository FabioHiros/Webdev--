"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const secrets_1 = require("./secrets");
function db(connection, dbname) {
    const query = `CREATE DATABASE IF NOT EXISTS ${dbname};`;
    try {
        connection.query(query);
    }
    catch (error) {
        throw new Error(`Failed to create database: ${error}`);
    }
}
db(connection_1.default, secrets_1.secrets.DB_NAME);
connection_1.default.changeUser({ database: secrets_1.secrets.DB_NAME });
function criaTabelaFornecedores(connection) {
    const query = `
    CREATE TABLE IF NOT EXISTS Fornecedor (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE
);
  `;
    connection.query(query);
}
criaTabelaFornecedores(connection_1.default);
function criaTabelaProdutos(connection) {
    const query = `CREATE TABLE IF NOT EXISTS Produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  fornecedor_id INT,
  FOREIGN KEY (fornecedor_id) REFERENCES Fornecedor(id),
  UNIQUE (nome, fornecedor_id) 
)`;
    connection.query(query);
}
criaTabelaProdutos(connection_1.default);
