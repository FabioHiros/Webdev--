"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const secrets_1 = require("./secrets");
connection_1.default.changeUser({ database: secrets_1.secrets.DB_NAME });
function produtosPorFornecedor(connection) {
    const query = `
    SELECT f.nome AS fornecedor, COUNT(p.id) AS total_produtos
    FROM Fornecedor f
    LEFT JOIN Produtos p ON f.id = p.fornecedor_id
    GROUP BY f.nome;
    `;
    connection.query(query, (error, results) => {
        if (error) {
            console.error(`Failed to get products by supplier: ${error}`);
            return;
        }
        console.log('Produtos por fornecedor');
        console.table(results);
    });
}
produtosPorFornecedor(connection_1.default);
function mostraProdutos(connection, precoMinimo) {
    const query = `
    SELECT p.nome AS produto, p.preco, f.nome AS fornecedor
    FROM Produtos p
    INNER JOIN Fornecedor f ON p.fornecedor_id = f.id
    WHERE p.preco > ?;
  `;
    connection.query(query, [precoMinimo], (error, resultados) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(`Produtos acima de ${precoMinimo}`);
        console.table(resultados);
    });
}
mostraProdutos(connection_1.default, 20);
