import mysql, { Connection } from 'mysql2/promise';
import { secrets } from './secrets';

const connectionConfig = {
  host: secrets.DB_HOST,
  user: secrets.DB_USER,
  password: secrets.DB_PASSWORD
};
async function main() {
  // Establishing a connection to the MySQL server
  const connection = await mysql.createConnection(connectionConfig);

  // Creating the database if it does not exist
  await criarDb(connection, secrets.DB_NAME);

  // Switching to the newly created database
  await connection.changeUser({ database: secrets.DB_NAME });

  // Creating the 'Fornecedor' table
  await criaTabelaFornecedores(connection);

  // Creating the 'Produtos' table
  await criaTabelaProdutos(connection);

  // Inserting data into the 'Fornecedor' table
  await insereFornecedores(connection);

  // Inserting data into the 'Produtos' table
  await insereProdutos(connection);

  // Querying and displaying products per supplier
  await produtoPorFornecedor(connection);

  // Querying and displaying products with price above a threshold
  await mostraProdutos(connection, 20.00);

  // Closing the connection to the database
  await connection.end();
}



async function criaTabelaFornecedores(connection: Connection) {
  const criaTabelaFornecedores = `
    CREATE TABLE IF NOT EXISTS Fornecedor (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL
    );
  `;
  await connection.query(criaTabelaFornecedores);
}

async function criaTabelaProdutos(connection: Connection) {
  const criaTabelaProdutos = `
    CREATE TABLE IF NOT EXISTS Produtos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      preco DECIMAL(10, 2) NOT NULL,
      fornecedor_id INT,
      FOREIGN KEY (fornecedor_id) REFERENCES Fornecedor(id)
    );
  `;
  await connection.query(criaTabelaProdutos);
}

async function insereFornecedores(connection: Connection) {
  const insertFornecedor = `
    INSERT INTO Fornecedor (nome) VALUES 
    ('Fornecedor A'),
    ('Fornecedor B'),
    ('Fornecedor C'),
    ('Fornecedor D'),
    ('Fornecedor E');
  `;
  await connection.query(insertFornecedor);
}

async function insereProdutos(connection: Connection) {
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
  await connection.query(insertProdutos);
}

async function produtoPorFornecedor(connection: Connection) {
  const query1 = `
    SELECT f.nome AS fornecedor, COUNT(p.id) AS total_produtos
    FROM Fornecedor f
    LEFT JOIN Produtos p ON f.id = p.fornecedor_id
    GROUP BY f.nome;
  `;
  const [produtosPorFornecedor] = await connection.query(query1);
  console.log('Produtos por fornecedor:');
  console.table(produtosPorFornecedor);
  console.log(produtosPorFornecedor);
}

async function mostraProdutos(connection: Connection, precoMinimo: number) {
  const query2 = `
    SELECT p.nome AS produto, p.preco, f.nome AS fornecedor
    FROM Produtos p
    INNER JOIN Fornecedor f ON p.fornecedor_id = f.id
    WHERE p.preco > ?;
  `;
  const [produtosComFornecedor] = await connection.query(query2, [precoMinimo]);
  console.log(`Produtos com preço acima de ${precoMinimo}:`);
  console.table(produtosComFornecedor);
  }


async function criarDb(connection: Connection, dbname: string) {
  try {
    // SQL query to create a database if it does not exist
    const query = `CREATE DATABASE IF NOT EXISTS \`${dbname}\`;`;
    await connection.query(query);
  } catch (error) {
    // Throwing the error to be handled by the main function
    throw new Error(`Failed to create database: ${error}`);
  }
}
main();
