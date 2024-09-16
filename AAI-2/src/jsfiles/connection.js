"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_1 = require("./secrets");
const mysql2_1 = __importDefault(require("mysql2"));
const connectionConfig = {
    host: secrets_1.secrets.DB_HOST,
    user: secrets_1.secrets.DB_USER,
    password: secrets_1.secrets.DB_PASSWORD
};
const connection = mysql2_1.default.createConnection(connectionConfig);
// console.log(secrets.DB_PASSWORD)
// connection.connect((error) => {
//     if (error) {
//         console.error('Error connecting: ' + error.stack);
//         return;
//     }
//     console.log('Connected as id ' + connection.threadId);
// });
exports.default = connection;
