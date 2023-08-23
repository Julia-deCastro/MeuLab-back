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
    const fontSizePadrao = '15px';
    const content = `Olá ${name}! Informamos que você foi aceito(a) no sistema WebLab! 
    Você já pode começar a usá-lo fazendo login com o seu nome de usuário e senha cadastrados.
    Atenciosamente, 
    Administração do sistema WebLab.`;

    const subject = 'Avaliação de solicitação.';
    const body = `<div style="font-size: ${fontSizePadrao};"><p>Olá <b>${name}</b>!<br/>
    Informamos que você foi aceito(a) no sistema WebLab!<br/>
    Você já pode começar a usá-lo fazendo login com 
    o seu nome de usuário e senha cadastrados.</p>
 
    <p>Atenciosamente,<br/> 
    Administração do sistema WebLab.</p><br/>
    <p>Esta mensagem foi gerada automaticamente. Não responda a este e-mail.</p></div>`;
    const emailContent = {
      to,
      subject,
      text: content,
      html: body
    };
    return Email.sendEmail(emailContent);
  },

  UserRefused(to, name) {
    const fontSizePadrao = '15px';
    const content = `Olá ${name}! lamentamos informar que sua solicitação de uso do WebLab foi recusada.
    Você pode tentar fazer uma nova solicitação posteriormente! Agardecemos seu interesse.
    Atenciosamente, Administração do sistema WebLab.`;
    const body = `<div style="font-size: ${fontSizePadrao};"><p>Olá <b>${name}</b>!<br/>
    Lamentamos informar que sua solicitação de uso do WebLab foi recusada.<br/>
    Você pode tentar fazer uma nova solicitação posteriormente. Agardecemos seu interesse!</p>
    
    <p>Atenciosamente,<br/> 
    Administração do sistema WebLab.</p><br/>
    <p>Esta mensagem foi gerada automaticamente. Não responda a este e-mail.</p></div>`;
    const subject = 'Avaliação de solicitação.';
    const emailContent = {
      to,
      subject,
      text: content,
      html: body
    };
    return Email.sendEmail(emailContent);
  },

  RecoverPassword(to, name, code) {
    const fontSizePadrao = '15px';
    const fontSize = '20px';
    const content = `Olá, ${name}. Aqui está o código exigido para alterar as suas credenciais no WebLab:
    ${code}
    Caso não esteja tentando alterar as suas credenciais, ignore este e-mail. 
    É possível que outro usuário tenha inserido as suas credenciais por engano.
    Atenciosamente, Administração do sistema WebLab.`;
    const body = `<div style="font-size: ${fontSizePadrao};"><p>Olá, <b>${name}</b>.</p>
    <p>Aqui está o código exigido para alterar as suas credenciais no WebLab:</p>
    <b style="font-size: ${fontSize};">${code}</b>
    <p>Caso não esteja tentando alterar as suas credenciais, ignore este e-mail.<br/>
    É possível que outro usuário tenha inserido as suas credenciais por engano.</p>
    
    <p>Atenciosamente,<br/> 
    Administração do sistema WebLab.</p><br/>
    <p>Esta mensagem foi gerada automaticamente. Não responda a este e-mail.</p></div>`;
    const subject = 'Recuperação da senha';
    const emailContent = {
      to,
      subject,
      text: content,
      html: body
    };
    return Email.sendEmail(emailContent);
  },

  ScheduleCanceled(to, name, expName, date) {
    const fontSizePadrao = '15px';
    const content = `Olá, ${name}. Ifmormamos que sua solicitação de agendamento do 
    experimento ${expName} para ${date} foi 
    indeferida devido à solicitação de outro usuário para esta mesma data e horário.
    Atenciosamente, Administração do sistema WebLab.
    Esta mensagem foi gerada automaticamente. Não responda a este e-mail`;
    const body = `<div style="font-size: ${fontSizePadrao};"><p>Olá, <b>${name}</b>.</p>
    <p>Ifmormamos que sua solicitação de agendamento do experimento ${expName} para 
    ${date} foi indeferida devido à solicitação 
    de outro usuário para esta mesma data e horário.</p>
    
    <p>Atenciosamente,<br/> 
    Administração do sistema WebLab.</p><br/>
    <p>Esta mensagem foi gerada automaticamente. Não responda a este e-mail.</p></div>`;
    const subject = 'Agendamento indeferido';
    const emailContent = {
      to,
      subject,
      text: content,
      html: body
    };
    return Email.sendEmail(emailContent);
  },

  ScheduleApproved(to, name, expName, date) {
    const fontSizePadrao = '15px';
    const content = `Olá, ${name}. Ifmormamos que sua solicitação de agendamento do 
    experimento ${expName} para ${date} foi 
    deferida com sucesso. Você já pode acessar as instruções no seu perfil e logo
    o experimento estará disponível para realização.
    Atenciosamente, Administração do sistema WebLab.
    Esta mensagem foi gerada automaticamente. Não responda a este e-mail`;
    const body = `<div style="font-size: ${fontSizePadrao};"><p>Olá, <b>${name}</b>.</p>
    <p>Ifmormamos que sua solicitação de agendamento do experimento ${expName} para 
    ${date} foi deferida com sucesso.<br/>
    Você já pode acessar as instruções no seu perfil e logo
    o experimento estará disponível para realização.</p>
    
    <p>Atenciosamente,<br/> 
    Administração do sistema WebLab.</p><br/>
    <p>Esta mensagem foi gerada automaticamente. Não responda a este e-mail.</p></div>`;
    const subject = 'Agendamento deferido';
    const emailContent = {
      to,
      subject,
      text: content,
      html: body
    };
    return Email.sendEmail(emailContent);
  },

};
