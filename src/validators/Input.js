const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      cod: Joi.string().required(),
      label: Joi.string().required(),
      helperText: Joi.string().optional(),
      placeholder: Joi.string().optional()
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
      id: Joi.string().guid({
        version: ['uuidv4'],
      }).required(),
    }),
  }),

  update: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().guid({
        version: ['uuidv4'],
      }).required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      cod: Joi.string().optional(),
      label: Joi.string().optional(),
      helperText: Joi.string().optional(),
      placeholder: Joi.string().optional()
    }),
  }),

  delete: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().guid({
        version: ['uuidv4'],
      }).required(),
    }),
  }),
};
