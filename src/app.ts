import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRouter);

export default app;
