const express = require('express');

const globalUserRouter = express.Router();

const GlobalUserController = require('../../controllers/GlobalUser');
const GlobalUserValidator = require('../../validators/GlobalUser');
const auth = require('../../middlewares/authentication');

globalUserRouter.get('/',
  GlobalUserValidator.geAll,
  auth.authenticateToken,
  GlobalUserController.getAll
);
globalUserRouter.get(
  '/:id',
  GlobalUserValidator.getById,
  auth.authenticateToken,
  GlobalUserController.getById
);
globalUserRouter.get('/user_name/:user_name',
  GlobalUserController.getByUserName
);
globalUserRouter.get('/email/:email',
  GlobalUserController.getByUserEmail
);
globalUserRouter.get('/type/:type',
  GlobalUserValidator.getByType,
  auth.authenticateToken,
  GlobalUserController.getByType
);
globalUserRouter.post(
  '/',
  GlobalUserValidator.create,
  GlobalUserController.create
);
globalUserRouter.put(
  '/:id',
  GlobalUserValidator.update,
  auth.authenticateToken,
  GlobalUserController.update
);
globalUserRouter.put(
  '/updatePass/:id',
  GlobalUserValidator.updatePassword,
  auth.authenticateToken,
  GlobalUserController.updatePassword
);
globalUserRouter.delete(
  '/refused/:id',
  GlobalUserValidator.delete,
  auth.authenticateToken,
  GlobalUserController.userRefused
);
globalUserRouter.delete(
  '/:id',
  GlobalUserValidator.delete,
  GlobalUserController.delete
);

module.exports = globalUserRouter;
