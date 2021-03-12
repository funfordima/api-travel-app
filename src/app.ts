import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import countryRouter from './routes/countryRouter';
import placeRouter from './routes/placeRouter';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/countries', countryRouter);
app.use('/places', placeRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  const status = 404;
  next({ 
    error,
    status
  });
});

app.use((err, req, res, next) => {
  res.json({
    statusCode: err.status || 505,
    message:  err.error.message,
  })
});

export default app;
