const router = require("express").Router();

const filesController = require("../controllers/filesController");

router.route("/files/:uuid").get(filesController.findFile);
router.route("/").get((req, res, next) => {
  res.render("index");
});
module.exports = router;
