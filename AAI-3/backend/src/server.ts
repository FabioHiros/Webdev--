import express, { Express } from 'express';
import router from './routes';

const cors = require('cors');
const app: Express = express();
let PORT = 3000
app.use(cors());
app.use(express.json());
app.use('/',router);
app.listen(PORT,() =>{console.log(`running on 127.0.0.1:${PORT}`)})
export default app;