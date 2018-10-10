const router = require("express").Router();
const topicController = require("../../controllers/topicController");

router.route("/:id")
    .get(topicController.getTopics);
    
module.exports = router;