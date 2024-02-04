const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Uploads')
    },
    filename: function (req, file, cb) {
      let no = [...Array(6)].map(_=>Math.random()*10|0).join``
      const uniqueSuffix = no
      req.fileNo = `${uniqueSuffix}`;
      cb(null,  uniqueSuffix + ".png")
    }
  })

 module.exports = upload = multer({ storage: storage })


