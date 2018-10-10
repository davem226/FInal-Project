const router = require("express").Router();
const topicController = require("../../controllers/topicController");

router.route("/:uid")
    .get(topicController.getTopics);
    
module.exports = router;