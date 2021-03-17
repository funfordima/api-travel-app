import app from './app';

const normalizePort = (val: string): number | boolean | string =>  {
  const newPort = parseInt(val, 10);

  if (isNaN(newPort)) {
    return val;
  }

  if (newPort >= 0) {
    return newPort;
  }

  return false;
};

const port = normalizePort(process.env.PORT || '3010');

app.set('port', port);

app.get('/', (request, response) => {
  response.send('Hello world!');
});

const start = () => {
  try {
    app.listen(port, () => console.log(`Running on port ${port}...`));
  } catch (err) {
    console.error(err.message);
  }
};

start();