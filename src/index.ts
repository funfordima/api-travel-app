import app from './app';
// import * as http from 'http';

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

app.listen(port, () => console.log(`Running on port ${port}...`));
