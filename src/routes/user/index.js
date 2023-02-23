const express = require('express');

const userRouter = express.Router();

const userController = require('../../controllers/User');
const userValidator = require('../../validators/User');
const auth = require('../../middlewares/authentication');

userRouter.get('/',
  userValidator.geAll,
  auth.authenticateToken,
  userController.getAll
);
userRouter.get(
  '/getById/:globalUser_id',
  userValidator.getById,
  auth.authenticateToken,
  userController.getById
);
userRouter.get(
  '/getBySituation/:status/:aprove',
  userValidator.getBySituation,
  auth.authenticateToken,
  userController.getBySituation
);
userRouter.get(
  '/getByAprove/:aprove',
  userValidator.getByAprove,
  auth.authenticateToken,
  userController.getByAprove
);
userRouter.post(
  '/',
  userValidator.create,
  userController.create
);
userRouter.put(
  '/:globalUser_id',
  userValidator.update,
  auth.authenticateToken,
  userController.update
);
userRouter.put(
  '/accept/:globalUser_id',
  userValidator.update,
  auth.authenticateToken,
  userController.userAccept
);
userRouter.delete(
  '/:globalUser_id',
  userValidator.delete,
  auth.authenticateToken,
  userController.delete
);

module.exports = userRouter;
