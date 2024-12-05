import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import { router } from './routes/routes';


const app: Application = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});