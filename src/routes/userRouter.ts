import Router from 'express';
import fs from 'fs';
import path from 'path';
import MongoController from '../mongoStore/mongoController';

const router = Router();
const filePath = `${path.resolve(__dirname)}/users.json`;

router.get('/', async (req, res) => {
  const content = await new MongoController().listAll('users');

  res.json(content);
});

export default router;
