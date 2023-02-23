/* eslint-disable prettier/prettier */
const FavoriteModel = require('../models/Favorite');

module.exports = {
  async create(request, response) {
    try {
      const favorite = request.body;
      await FavoriteModel.create(favorite);
      return response.status(201).json({ user_id: favorite.user_id });
    } catch (err) {
      console.error(`Favorite creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await FavoriteModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Favorite getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { user_id } = request.params;
      const result = await FavoriteModel.getById(user_id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Favorite getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { user_id } = request.params;
      const { experiment_id } = request.params;
      await FavoriteModel.deleteById(user_id, experiment_id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Favorite delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
