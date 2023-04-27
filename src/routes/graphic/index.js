const express = require('express');

const graphicRouter = express.Router();

const GraphicController = require('../../controllers/Graphic');
const GraphicValidator = require('../../validators/Graphic');
const auth = require('../../middlewares/authentication');

graphicRouter.get('/',
  GraphicValidator.getAll,
  auth.authenticateToken,
  GraphicController.getAll
);
graphicRouter.get(
  '/:id',
  GraphicValidator.getById,
  auth.authenticateToken,
  GraphicController.getById
);
graphicRouter.post(
  '/',
  GraphicValidator.create,
  auth.authenticateToken,
  GraphicController.create
);
graphicRouter.put(
  '/:id',
  GraphicValidator.update,
  auth.authenticateToken,
  GraphicController.update
);
graphicRouter.delete(
  '/:id',
  GraphicValidator.delete,
  GraphicController.delete
);

module.exports = graphicRouter;
