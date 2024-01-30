const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      classification: Joi.string().guid({
        version: ['uuidv4'],
      }).required(),
      instructions: Joi.string().required(),
      images: Joi.string().required(),
      featured: Joi.boolean().required(),
      exemplary: Joi.number().required(),
      server_ip: Joi.string().optional(),
      server_port: Joi.number().optional(),
      stream_link: Joi.string().optional(),
      duration: Joi.string().required(),
      disponibility: Joi.boolean().required(),
      gweb_link: Joi.string().required()
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
        description: Joi.string().optional(),
        classification: Joi.string().guid({
          version: ['uuidv4'],
        }).optional(),
        instructions: Joi.string().optional(),
        images: Joi.string().optional(),
        featured: Joi.boolean().optional(),
        exemplary: Joi.number().optional(),
        server_ip: Joi.string().optional(),
        server_port: Joi.number().optional(),
        stream_link: Joi.string().optional(),
        duration: Joi.string().optional(),
        disponibility: Joi.boolean().optional(),
        gweb_link: Joi.string().optional()
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
