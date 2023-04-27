/* eslint-disable prettier/prettier */
const ImageModel = require('../models/Image');

module.exports = {
  async create(request, response) {
    try {
      const image = request.body;
      await ImageModel.create(image);
      return response.status(201).json({ image });
    } catch (err) {
      console.error(`Result creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const image = await ImageModel.getAll();
      return response.status(200).json(image);
    } catch (err) {
      console.error(`Result getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { experiment_id } = request.params;
      const image = await ImageModel.getById(experiment_id);
      return response.status(200).json(image);
    } catch (err) {
      console.error(`Result getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { experiment_id } = request.params;
      const image = request.body;

      const stillExistFieldsToUpdate = Object.values(image).length > 0;
      if (stillExistFieldsToUpdate) {
        await ImageModel.updateById(experiment_id, image);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Result update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { experiment_id } = request.params;
      await ImageModel.deleteById(experiment_id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Result delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
