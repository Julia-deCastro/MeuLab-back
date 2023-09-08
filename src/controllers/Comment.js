/* eslint-disable prettier/prettier */
const { v4: uuidv4 } = require('uuid');
const CommentModel = require('../models/Comment');

module.exports = {
  async create(request, response) {
    try {
      const comment = request.body;
      comment.id = uuidv4();
      const date = new Date();
      comment.create_in = date;
      await CommentModel.create(comment);
      return response.status(201).json({ id: comment.id });
    } catch (err) {
      console.error(`Comment creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await CommentModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Comment getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await CommentModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Comment getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const comment = request.body;

      const stillExistFieldsToUpdate = Object.values(comment).length > 0;
      if (stillExistFieldsToUpdate) {
        await CommentModel.updateById(id, comment);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Comment update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await CommentModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Comment delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
