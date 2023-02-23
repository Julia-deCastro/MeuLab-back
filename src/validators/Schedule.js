const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
        experiment_id: Joi.string().
        guid({
            version: ['uuidv4'],
        }).required(),
        user_id: Joi.string().
        guid({
            version: ['uuidv4'],
        }).required(),
        date: Joi.date().required(),
        hour: Joi.string().required(),
        wating_confirmation: Joi.boolean().required(),
        status: Joi.string().valid('done', 'abandoned', 'unrealized').required()
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
      experiment_id: Joi.string().
        guid({
            version: ['uuidv4'],
        }).optional(),
      user_id: Joi.string().
        guid({
            version: ['uuidv4'],
        }).optional(),
      date: Joi.date().optional(),
      hour: Joi.string().optional(),
      wating_confirmation: Joi.boolean().optional(),
      status: Joi.string().valid('done', 'abandoned', 'unrealized').optional()
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
