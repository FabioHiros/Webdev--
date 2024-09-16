import { secrets } from "./secrets";
import mysql from 'mysql2';
const connectionConfig = {
    host: secrets.DB_HOST,
    user: secrets.DB_USER,
    password: secrets.DB_PASSWORD
  };

const connection =  mysql.createConnection(connectionConfig);
// console.log(secrets.DB_PASSWORD)

// connection.connect((error) => {
//     if (error) {
//         console.error('Error connecting: ' + error.stack);
//         return;
//     }
//     console.log('Connected as id ' + connection.threadId);
// });


export default connection;