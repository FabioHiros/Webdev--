"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const secrets_1 = require("./secrets");
connection_1.default.changeUser({ database: secrets_1.secrets.DB_NAME });
insereFornecedores(connection_1.default);
insereProdutos(connection_1.default);
connection_1.default.end();
function insereFornecedores(connection) {
    const query = `
    INSERT INTO Fornecedor (nome) VALUES 
    ('Fornecedor A'),
    ('Fornecedor B'),
    ('Fornecedor C'),
    ('Fornecedor D'),
    ('Fornecedor E')
    ON DUPLICATE KEY UPDATE nome=VALUES(nome);
  `;
    connection.query(query, (err) => {
        if (err) {
            console.error('Error inserting fornecedores:', err);
        }
        else {
            console.log('Fornecedores inserted successfully.');
        }
    });
}
function insereProdutos(connection) {
    const query = `
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
    ('Produto 120', 100.00, 5)
    ON DUPLICATE KEY UPDATE
        nome=VALUES(nome),
        preco=VALUES(preco),
        fornecedor_id=VALUES(fornecedor_id);
  `;
    connection.query(query, (err) => {
        if (err) {
            console.error('Error inserting produtos:', err);
        }
        else {
            console.log('Produtos inserted successfully.');
        }
    });
}
