const express = require('express');

const recoverPassRouter = express.Router();

const RecoverPassController = require('../../controllers/RecoverPassword');
const RecoverPassValidator = require('../../validators/RecoverPassword');
const auth = require('../../middlewares/authentication');

recoverPassRouter.post(
  '/',
  RecoverPassValidator.create,
  RecoverPassController.create
);
recoverPassRouter.get('/',
  RecoverPassValidator.geAll,
  auth.authenticateToken,
  RecoverPassController.getAll
);
recoverPassRouter.get(
  '/verify/:globalUser_id/:code',
  RecoverPassValidator.getVerify,
  RecoverPassController.getVerify
);
recoverPassRouter.delete(
  '/:globalUser_id',
  RecoverPassValidator.delete,
  auth.authenticateToken,
  RecoverPassController.delete
);

module.exports = recoverPassRouter;
