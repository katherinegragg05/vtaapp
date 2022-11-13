const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  Bucket: process.env.AWS_S3_BUCKET,
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "uccvtaappbucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldName });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = {
  upload,
};
