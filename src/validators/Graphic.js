const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      experiment_id: Joi.string().guid({
        version: ['uuidv4'],
      }).required(),
      title: Joi.string().required(),
      type: Joi.string().required(),
      xInputCod: Joi.string().required(),
      zInputCod: Joi.string().optional(),
      xTitle: Joi.string().required(),
      yTitle: Joi.string().required(),
      zTitle: Joi.string().optional(),
      colorScale: Joi.string().optional()
    }),
  }),

  getAll: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    }),

  getById: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
    }),
  }),

  update: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().optional(),
      type: Joi.string().optional(),
      xInputCod: Joi.string().optional(),
      zInputCod: Joi.string().optional(),
      xTitle: Joi.string().optional(),
      yTitle: Joi.string().optional(),
      zTitle: Joi.string().optional(),
      colorScale: Joi.string().optional()
    }),
  }),

  delete: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
    }),
  }),
};
