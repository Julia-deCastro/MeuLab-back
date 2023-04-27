const multer = require('multer');
const path = require("path");

module.exports = (multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, `./public/upload/files`)
        },
        filename: function(req, file, cb) {
            cb(null, req.params.fileId + '.txt')  
        }
    }),
}));