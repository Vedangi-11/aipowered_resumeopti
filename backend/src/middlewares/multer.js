const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = (foldername) => multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./src/uploads/${foldername}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, `${Date.now()}${Math.random().toString().substr(2, 5)}${extension}`);
    },
});

module.exports = storage;
