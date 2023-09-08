/* eslint-disable prettier/prettier */
const RecoverPassModel = require('../models/RecoverPassword');
const GlobalUserModel = require('../models/GlobalUser');
const Mail = require('../mail/mail');
const { createHmac } = require('crypto');
const cron = require("node-cron");
require('dotenv').config();

function encryptData(data) {
  const hash = createHmac(process.env.ALGORITHM, process.env.SECRET)
    .update(data)
    .digest(process.env.OUTPUT);
  return hash;
}

function generateRandomFiveDigits() {
  const min = 10000;
  const max = 99999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  async create(request, response) {
    try {
      const recoverPass = request.body;
      const verify = await RecoverPassModel.getByFields({ globalUser_id: recoverPass.globalUser_id});
      if (verify) await RecoverPassModel.deleteById(recoverPass.globalUser_id);
      const randomCode = generateRandomFiveDigits();
      recoverPass.code = encryptData(randomCode.toString());
      const date = new Date();
      recoverPass.create_in = date;
      await RecoverPassModel.create(recoverPass);
      const result = await GlobalUserModel.getById(recoverPass.globalUser_id);
      const userGlobal = JSON.parse(JSON.stringify(result));
      Mail.RecoverPassword(userGlobal[0].email, userGlobal[0].name, randomCode);

      // Expiração do código
      let data = new Date();
      data.setMinutes(data.getMinutes() + 10);
      const day = data.getDate().toString();
      const month = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
      const minutes = data.getMinutes();
      const hour = data.getHours();
      const cronExpression = `${minutes} ${hour} ${day} ${month} *`;

      const task = cron.schedule(cronExpression, async () => {
        await RecoverPassModel.deleteById(recoverPass.globalUser_id);
        task.stop();
      });

      return response.status(201).json("Ok");
    } catch (err) {
      console.error(`recoverPass creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await RecoverPassModel.getAll();

      return response.status(200).json(result);
    } catch (err) {
      console.error(`recoverPass getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getVerify(request, response) {
    try {
      const { globalUser_id, code } = request.params;
      const data = await RecoverPassModel.getById(globalUser_id);
      if (data === undefined) return response.status(540).json({
        notification: 'Not Found',
      });
      const result = JSON.parse(JSON.stringify(data));
      
      const hash = createHmac(process.env.ALGORITHM, process.env.SECRET)
      .update(code)
      .digest(process.env.OUTPUT);
      
      if (result.code === hash) return response.status(200).json(true);
      else return response.status(200).json(false);

    } catch (err) {
      console.error(`recoverPass getByVerify failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { globalUser_id } = request.params;
      await RecoverPassModel.deleteById(globalUser_id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`recoverPass delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
