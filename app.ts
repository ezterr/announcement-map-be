import express, { json } from 'express';
import cors from 'cors';
import { handleErrors } from './middleware/handle-errors';

const app = express();

app.use(json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(handleErrors);

app.listen(3001, 'localhost', () => {
  console.log('the server has started on port 3001 --> http://localhost:3001/');
});
