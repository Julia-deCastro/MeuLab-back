/* eslint-disable prettier/prettier */
const Mail = require("../mail/mail");

module.exports = {
  async contact(request, response) {
    try {
      const contact = request.body;
      Mail.Contact("weblabufmg@gmail.com", contact.name, contact.email, contact.phone, contact.message);
      return response.status(201).json({ notification: "OK" });
    } catch (err) {
      console.error(`Cntact failed: ${err}`);
      return response.status(500).json({
        notification: "Internal server error"
      });
    }
  }
};
