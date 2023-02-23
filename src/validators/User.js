const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      globalUser_id: Joi.string().required(),
      profession: Joi.string().required(),
      instituition: Joi.string().optional(),
      type_instituition: Joi.string().optional(),
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      purpose_use: Joi.string().required()
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
      globalUser_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
    }),
  }),

  getBySituation: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      status: Joi.string().required(),
      aprove: Joi.string().required()
    }),
  }),

  getByAprove: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      aprove: Joi.string().required()
    }),
  }),

  update: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      globalUser_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        globalUser_id: Joi.string().optional(),
        profession: Joi.string().optional(),
        instituition: Joi.string().optional(),
        type_instituition: Joi.string().optional(),
        country: Joi.string().optional(),
        state: Joi.string().optional(),
        city: Joi.string().optional(),
        purpose_use: Joi.string().optional(),
        status: Joi.boolean().optional(),
        aprove: Joi.boolean().optional()
    }),
  }),

  delete: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      globalUser_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
    }),
  }),
};
