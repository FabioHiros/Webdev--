import { Connection } from 'mysql2';
import connection from './connection';
import { secrets } from './secrets';

connection.changeUser({ database: secrets.DB_NAME });

function produtosPorFornecedor(connection:Connection) {
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
        console.log('Produtos por fornecedor')
        console.table(results);
    });
}

produtosPorFornecedor(connection)

function mostraProdutos(connection:Connection,precoMinimo:Number){
    const query = `
    SELECT p.nome AS produto, p.preco, f.nome AS fornecedor
    FROM Produtos p
    INNER JOIN Fornecedor f ON p.fornecedor_id = f.id
    WHERE p.preco > ?;
  `;
  connection.query(query, [precoMinimo],(error,resultados) =>{
    if (error){
        console.log(error)
        return
    }
    console.log(`Produtos acima de ${precoMinimo}`)
    console.table(resultados)
  })
}

mostraProdutos(connection,20)