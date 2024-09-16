import { Connection } from "mysql2";
import connection from "./connection";
import { secrets } from "./secrets";


function db(connection: Connection, dbname: string){
    const query = `CREATE DATABASE IF NOT EXISTS ${dbname};`
    try{
        connection.query(query)
    }catch(error){
        throw new Error(`Failed to create database: ${error}`);
    }
}

db(connection,secrets.DB_NAME)

connection.changeUser({ database: secrets.DB_NAME });


function criaTabelaFornecedores(connection:Connection){
    const query =`
    CREATE TABLE IF NOT EXISTS Fornecedor (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE
);
  `;
  connection.query(query)
}

criaTabelaFornecedores(connection)

function criaTabelaProdutos(connection:Connection){
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

criaTabelaProdutos(connection)