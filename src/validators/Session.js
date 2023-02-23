const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  signIn: celebrate({
    [Segments.BODY]: Joi.object().keys({
      user_name: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),

  signInAdm: celebrate({
    [Segments.BODY]: Joi.object().keys({
      user_name: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
};