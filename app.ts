import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { handleErrors } from './middleware/handle-errors';
import { router } from './routes';
import { passportConfig } from './services/passport/passport-config';

passportConfig();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api', router);
app.use(handleErrors);

app.listen(3001, 'localhost', () => {
  console.log('the server has started on port 3001 --> http://localhost:3001/');
});
