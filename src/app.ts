import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import countryRouter from './routes/countryRouter';

const app = express();

// app.use(logger('common', {
//   stream: fs.createWriteStream('./access.log', {flags: 'a'})
// }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/countries', countryRouter);

export default app;
