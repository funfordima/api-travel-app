import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const filePath = `${path.resolve(__dirname)}/routes/users.json`;

app.use(express.json());

app.get('/users', (req, res) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const users = JSON.parse(content);

  res.send(users);
});

export default app;
