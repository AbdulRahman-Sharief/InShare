const router = require("express").Router();

const filesController = require("../controllers/filesController");

router.route("/:uuid").get(filesController.download);

module.exports = router;
