const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      globalUser_id: Joi.string().required(),
    }),
  }),

  geAll: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    }),

  getVerify: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      globalUser_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
      code: Joi.string().required()
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
