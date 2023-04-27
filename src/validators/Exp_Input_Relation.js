const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      input_id: Joi.string().required(),
      experiment_id: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
    .required()
    }),
  }),

  geAll: celebrate({
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
      experiment_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required()
    }),
  }),

  delete: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      input_id: Joi.string().required(),
      experiment_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
      .required()
    }),
  }),
};
