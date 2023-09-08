/* eslint-disable prettier/prettier */
const Mail = require('../mail/mail');
const UserModel = require('../models/User');
require('dotenv').config();


module.exports = {
  async create(request, response) {
    try {
      const user = request.body;

      await UserModel.create(user);
      return response.status(201).json({ id: user.globalUser_id });
    } catch (err) {
      console.error(`User creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await UserModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`User getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { globalUser_id } = request.params;
      const result = await UserModel.getById(globalUser_id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`User getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getBySituation(request, response) {
    try {
      const { status, aprove } = request.params;
      const result = await UserModel.getBySituation({
        status: status,
        aprove: aprove
      });
      return response.status(200).json(result);
    } catch (err) {
      console.error(`User getBySituation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByAprove(request, response) {
    try {
      const { aprove } = request.params;
      const result = await UserModel.getByFields({
        aprove: aprove
      });
      return response.status(200).json(result);
    } catch (err) {
      console.error(`User getByAprove failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByCountry(request, response) {
    try {
      const result = await UserModel.getCountByCountry();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`User getByCountry failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async userAccept(request, response) {
    try {
      const { globalUser_id } = request.params;
      const user = request.body;

      const stillExistFieldsToUpdate = Object.values(user).length > 0;
      if (stillExistFieldsToUpdate) {
        await UserModel.updateById(globalUser_id, user);
      }
      const userGlobal = await UserModel.getById(globalUser_id);
      Mail.UserAccept(userGlobal.email, userGlobal.name);
      return response.status(200).json('OK');
      
    } catch (err) {
      console.error(`User update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { globalUser_id } = request.params;
      const user = request.body;

      const stillExistFieldsToUpdate = Object.values(user).length > 0;
      if (stillExistFieldsToUpdate) {
        await UserModel.updateById(globalUser_id, user);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`User update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { globalUser_id } = request.params;
      await UserModel.deleteById(globalUser_id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`User delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
