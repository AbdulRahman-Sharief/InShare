const router = require("express").Router();

const filesController = require("../controllers/filesController");

router.route("/").post(filesController.upload);
router.route("/send").post(filesController.sendEmail);

module.exports = router;
