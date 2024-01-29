const express = require('express');

const commentRouter = express.Router();

const commentController = require('../../controllers/Comment');
const commentValidator = require('../../validators/Comment');
const auth = require('../../middlewares/authentication');


commentRouter.get('/',
  commentValidator.getAll,
  auth.authenticateToken,
  commentController.getAll
);
commentRouter.get(
  '/:id',
  commentValidator.getById,
  auth.authenticateToken,
  commentController.getById
);
commentRouter.post(
  '/',
  commentValidator.create,
  auth.authenticateToken,
  commentController.create
);
commentRouter.put(
  '/:id',
  commentValidator.update,
  auth.authenticateToken,
  commentController.update
);
commentRouter.delete(
  '/:id',
  commentValidator.delete,
  auth.authenticateToken,
  commentController.delete
);

module.exports = commentRouter;
