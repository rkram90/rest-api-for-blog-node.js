const path = require("path");
const multer = require("multer");

//Configuration for Multer
const multerStorage = (folderName) => multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public`);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `uploads/${folderName}/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });

exports.uploadImage = function uploadImage(folderName) {
    return multer({
        storage: multerStorage(folderName),
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            if(
                ext !== ".png" &&
                ext !== ".jpg" &&
                ext !== ".gif" &&
                ext !== ".jpeg"
            ){
                return cb(new Error("Only images are allowed!"));
            }
            cb(null, true);
        }
    });
}