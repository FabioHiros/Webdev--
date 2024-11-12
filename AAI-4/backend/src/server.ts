import express from 'express';
import { PrismaClient } from '@prisma/client';
import router from './routes/routes';
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/',router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
