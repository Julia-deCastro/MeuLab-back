const GlobalUser = require("../models/GlobalUser");
const UserModel = require('../models/User');
const jwt = require("jsonwebtoken");
const { createHmac } = require('crypto');
require('dotenv').config();

module.exports = {
  async signIn(request, response) {
    try {
      const { email, password } = request.body;

      const user = await GlobalUser.getByFields({ email: email });
      if (user.type === "adm") {
        return response
        .status(520)
        .json({ notification: "Access Denied" });
      }
      const userDatas = await UserModel.getByFields({ globalUser_id: user.id });
      if (userDatas[0].aprove === 0 || userDatas[0].status === 0) {
        return response
        .status(520)
        .json({ notification: "Access Denied" });
      }
      const hash = createHmac(process.env.ALGORITHM, process.env.SECRET)
                  .update(password)
                  .digest(process.env.OUTPUT);

      if(user.password == hash) {
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "30d",
        });
  
        return response.status(200).json({ user, accessToken });
      } else {
        return response
        .status(500)
        .json({ notification: "Invalid Credentials" });
      }
    } catch (error) {
      if (error.code?.includes('auth')) {
        return response
          .status(403)
          .json({ notification: 'Invalid credentials' });
      }
      return response
        .status(500)
        .json({ notification: 'Error while trying to validate credentials' });
    }
  },

  async signInAdm(request, response) {
    try {
      const { email, password } = request.body;

      const user = await GlobalUser.getByFields({ email: email });
      if (user.type === "user") {
        return response
        .status(520)
        .json({ notification: "Access Denied" });
      }
      const hash = createHmac(process.env.ALGORITHM, process.env.SECRET)
                  .update(password)
                  .digest(process.env.OUTPUT);

      if(user.password == hash) {
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "30d",
        });
  
        return response.status(200).json({ user, accessToken });
      } else {
        return response
        .status(500)
        .json({ notification: "Invalid Credentials" });
      }
    } catch (error) {
      if (error.code?.includes('auth')) {
        return response
          .status(403)
          .json({ notification: 'Invalid credentials' });
      }
      return response
        .status(500)
        .json({ notification: 'Error while trying to validate credentials' });
    }
  } 
};

