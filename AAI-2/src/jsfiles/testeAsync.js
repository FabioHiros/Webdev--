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
const promise_1 = __importDefault(require("mysql2/promise"));
const secrets_1 = require("./secrets");
const connectionConfig = {
    host: secrets_1.secrets.DB_HOST,
    user: secrets_1.secrets.DB_USER,
    password: secrets_1.secrets.DB_PASSWORD
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Establishing a connection to the MySQL server
        const connection = yield promise_1.default.createConnection(connectionConfig);
        // Creating the database if it does not exist
        yield criarDb(connection, secrets_1.secrets.DB_NAME);
        // Switching to the newly created database
        yield connection.changeUser({ database: secrets_1.secrets.DB_NAME });
        // Creating the 'Fornecedor' table
        yield criaTabelaFornecedores(connection);
        // Creating the 'Produtos' table
        yield criaTabelaProdutos(connection);
        // Inserting data into the 'Fornecedor' table
        yield insereFornecedores(connection);
        // Inserting data into the 'Produtos' table
        yield insereProdutos(connection);
        // Querying and displaying products per supplier
        yield produtoPorFornecedor(connection);
        // Querying and displaying products with price above a threshold
        yield mostraProdutos(connection, 20.00);
        // Closing the connection to the database
        yield connection.end();
    });
}
function criaTabelaFornecedores(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const criaTabelaFornecedores = `
    CREATE TABLE IF NOT EXISTS Fornecedor (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL
    );
  `;
        yield connection.query(criaTabelaFornecedores);
    });
}
function criaTabelaProdutos(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const criaTabelaProdutos = `
    CREATE TABLE IF NOT EXISTS Produtos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      preco DECIMAL(10, 2) NOT NULL,
      fornecedor_id INT,
      FOREIGN KEY (fornecedor_id) REFERENCES Fornecedor(id)
    );
  `;
        yield connection.query(criaTabelaProdutos);
    });
}
function insereFornecedores(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const insertFornecedor = `
    INSERT INTO Fornecedor (nome) VALUES 
    ('Fornecedor A'),
    ('Fornecedor B'),
    ('Fornecedor C'),
    ('Fornecedor D'),
    ('Fornecedor E');
  `;
        yield connection.query(insertFornecedor);
    });
}
function insereProdutos(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const insertProdutos = `
    INSERT INTO Produtos (nome, preco, fornecedor_id) VALUES 
    ('Produto 1', 10.00, 1),
    ('Produto 2', 20.00, 1),
    ('Produto 3', 30.00, 2),
    ('Produto 4', 40.00, 2),
    ('Produto 5', 50.00, 3),
    ('Produto 6', 60.00, 3),
    ('Produto 7', 70.00, 4),
    ('Produto 8', 80.00, 4),
    ('Produto 9', 90.00, 5),
    ('Produto 10', 100.00, 5);
  `;
        yield connection.query(insertProdutos);
    });
}
function produtoPorFornecedor(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const query1 = `
    SELECT f.nome AS fornecedor, COUNT(p.id) AS total_produtos
    FROM Fornecedor f
    LEFT JOIN Produtos p ON f.id = p.fornecedor_id
    GROUP BY f.nome;
  `;
        const [produtosPorFornecedor] = yield connection.query(query1);
        console.log('Produtos por fornecedor:');
        console.table(produtosPorFornecedor);
        console.log(produtosPorFornecedor);
    });
}
function mostraProdutos(connection, precoMinimo) {
    return __awaiter(this, void 0, void 0, function* () {
        const query2 = `
    SELECT p.nome AS produto, p.preco, f.nome AS fornecedor
    FROM Produtos p
    INNER JOIN Fornecedor f ON p.fornecedor_id = f.id
    WHERE p.preco > ?;
  `;
        const [produtosComFornecedor] = yield connection.query(query2, [precoMinimo]);
        console.log(`Produtos com preço acima de ${precoMinimo}:`);
        console.table(produtosComFornecedor);
    });
}
function criarDb(connection, dbname) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // SQL query to create a database if it does not exist
            const query = `CREATE DATABASE IF NOT EXISTS \`${dbname}\`;`;
            yield connection.query(query);
        }
        catch (error) {
            // Throwing the error to be handled by the main function
            throw new Error(`Failed to create database: ${error}`);
        }
    });
}
main();
