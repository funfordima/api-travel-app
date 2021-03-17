import { Router } from 'express';
// import { v4 as uuid } from 'uuid';
// import { MongoController } from '../mongoStore/mongoController';
// import { places as dbName } from '../constants/constants';
import authController from '../mongoStore/authController';

const authRouter = Router();

authRouter.get('/users', authController.getUsers);

// authRouter.get('/:id', async (req, res, next) => {
//   const item = await new MongoController().getById(dbName, req.params.id);

//   res.status(item ? 200 : 404)
//     .json(item ?? {
//       statusCode: 404,
//     });
// });

authRouter.post('/registration', authController.registration);

authRouter.post('/login', authController.login);

// authRouter.put('/:id', async (req, res, next) => {
//   const { body } = req;
//   const newBody = await new MongoController().updateItem(dbName, {
//     ...body,
//     id: req.params.id,
//   });

//   res.status(200).json(newBody);
// });

// authRouter.delete('/:id', async (req, res, next) => {
//   await new MongoController().deleteItem(dbName, req.params._id);

//   res
//     .status(404)
//     .json(null);
// });

export default authRouter;
