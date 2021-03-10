import express from 'express';
import cors from 'cors';
import countryRouter from './routes/countryRouter';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/countries', countryRouter);

export default app;
