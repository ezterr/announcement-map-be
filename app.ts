import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { handleErrors } from './middleware/handle-errors';
import { router } from './routes';
import { passportConfig } from './utils/passport/passport-config';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.set('trust proxy', 1);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
passportConfig();

app.use('/api', router);
app.use(handleErrors);

app.listen(3001, '127.0.0.1', () => {
  console.log('the server has started on port 3001 --> http://localhost:3001/');
});
