const multer = require('multer')
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        console.log("file", file);
        
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

module.exports = upload;