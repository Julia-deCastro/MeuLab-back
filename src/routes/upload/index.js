const express = require('express');

const uploadRouter = express.Router();

const auth = require('../../middlewares/authentication');
const upload = require('../../middlewares/uploadFile');
const uploadImage = require('../../middlewares/uploadImage');

uploadRouter.post("/upload/:imageId", 
auth.authenticateToken,
uploadImage.single('image'), async (req, res) => {
  if (req.file) {
      return res.json({
          erro: false,
          mensagem: "Upload realizado com sucesso!"
      });
  }
  return res.status(400).json({
      erro: true,
      mensagem: "Erro: Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!"
  });
});

uploadRouter.post("/uploadFile/file/:fileId", 
auth.authenticateToken,
upload.single('file'), (req, res) => {
  if (req.file) {
      return res.json({
          erro: false,
          mensagem: "Upload realizado com sucesso!"
      });
  }
  return res.status(400).json({
      erro: true,
      mensagem: "Erro: Upload não realizado com sucesso!"
  });
});

module.exports = uploadRouter;