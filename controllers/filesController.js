const multer = require("multer");
const path = require("path");
const File = require("../models/fileModel");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../utilities/sendEmail");
const emailTemplate = require("../utilities/emailTemplate");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => {
    const uniqueName = `${
      Date.now() + "-" + Math.round(Math.random() * 1e9)
    }${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});
let upload = multer({
  storage,
  limits: {
    fileSize: 1000000 * 1000,
  },
}).single("myfile");

exports.upload = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    const file = new File({
      filename: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
  });
};

exports.findFile = async (req, res, next) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file)
      return res.render("download", { error: "Link has been expired!!" });

    return res.render("download", {
      uuid: file.uuid,
      fileName: file.filename,
      fileSize: file.size,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    });
  } catch (err) {
    return res.render("download", {
      error: "Something went wrong , please try again !!",
    });
  }
};

exports.download = async (req, res, next) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file)
      return res.render("download", { error: "Link has been expired!!" });

    const filePath = `${file.path}`;
    res.download(filePath);
  } catch (err) {
    return res.render("download", {
      error: "Something went wrong , please try again !!",
    });
  }
};

exports.sendEmail = async (req, res, next) => {
  const { uuid, emailFrom, emailTo } = req.body;

  //Validate request
  if (!uuid || !emailFrom || !emailTo)
    return res.status(422).send({ error: "All fields are required !! " });

  //GET DATA FROM DATABASE
  const file = await File.findOne({ uuid });

  if (file.sender)
    return res.status(422).send({ error: "Email already sent!! " });

  file.sender = emailFrom;
  file.receiver = emailTo;
  const response = await file.save();

  //SEND EMAIL
  sendEmail(
    emailFrom,
    emailTo,
    "InShare File Sharing",
    `${emailFrom} shared a file with you.`,
    emailTemplate({
      emailFrom: emailFrom,
      downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
      size: parseInt(file.size / 1000) + " Kb",
      expires: "24 hours",
    })
  );
  return res.send({ success: true });
};
