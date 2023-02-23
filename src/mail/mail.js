/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
class Email {
  static sendEmail(request) {
    const config = {
      from: `"WebLab" <${process.env.EMAIL_LOGIN}>`,
      ...request,
    };
    try {
      transporter.sendMail(config);
    } catch (error) {
      return console.error(error);
    }
  }
}

module.exports = {
  UserAccept(to, name) {
    const content = `Olá ${name}, você foi aceito(a) no sistema WebLab! Você já pode começar a usá-lo fazendo login com o seu nome de usuário e senha cadastrados.
    
  Atenciosamente, 
  Administração do sistema WebLab.`;
    const subject = 'Avaliação de solicitação.';
    const body = `<p>Olá <b>${name}</b>, você foi aceito(a) no sistema WebLab! Você já pode começar a usá-lo fazendo login com o seu nome de usuário e senha cadastrados.
    
    <p>Atenciosamente,</p> 
    <p>Administração do sistema WebLab.</p></p>`;
    const emailContent = {
      to,
      subject,
      text: content,
      html: body
    };
    return Email.sendEmail(emailContent);
  },

  UserRefused(to, name) {
    const content = `Olá ${name}, lamentamos informar que sua solicitação de uso do WebLab foi recusada.
    Você pode tentar fazer uma nova solicitação posteriormente! Agardecemos seu interesse.
    Atenciosamente, Administração do sistema WebLab.`;
    const body = `<p>Olá <b>${name}</b>, lamentamos informar que sua solicitação de uso do WebLab foi recusada.
    Você pode tentar fazer uma nova solicitação posteriormente! Agardecemos seu interesse.
    
    <p>Atenciosamente,</p> 
    <p>Administração do sistema WebLab.</p></p>`;
    const subject = 'Avaliação de solicitação.';
    const emailContent = {
      to,
      subject,
      text: content,
      html: body
    };
    return Email.sendEmail(emailContent);
  },

};
