import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { MongoController } from '../mongoStore/mongoController';
import { countries as dbName } from '../constants/constants';

const countryRouter = Router();

countryRouter.get('/', async (req, res) => {
  try {
    const content = await new MongoController().listAll(dbName);

    res.status(200).json(content);
  } catch (err) {
    throw new Error(err);
  }
});

countryRouter.get('/:id', async (req, res, next) => {
  const item = await new MongoController().getById(dbName, req.params.id);

  res.status(item ? 200 : 404)
    .json(item ?? {
      message: 'Id does not exist',
      statusCode: 404,
    });
});

countryRouter.post('/', async (req, res, next) => {
  // const id = uuid();
  const { body } = req;

  body.forEach(item => item.id = uuid());

  // body.id = id;

  const newBody = await new MongoController().createItems(dbName, body);
  res.status(200).json(newBody);
});

countryRouter.put('/:id', async (req, res, next) => {
  const { body } = req;
  const newBody = await new MongoController().updateItem(dbName, {
    ...body,
    id: req.params.id,
  });

  res.status(200).json(newBody);
});

countryRouter.delete('/:id', async (req, res, next) => {
  await new MongoController().deleteItem(dbName, req.params._id);

  res
    .status(404)
    .json(null);
});

export default countryRouter;
