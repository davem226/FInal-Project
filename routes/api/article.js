const router = require("express").Router();
const articleController = require("../../controllers/articleController");

router.route("/")
    .post(articleController.saveArticle);

router.route("/:uid")
    .get(articleController.getArticles);

module.exports = router;