const router = require("express").Router();
const authRoutes = require("./auth");
const topicRoutes = require("./topic");
const articleRoutes = require("./article");

router.use("/auth", authRoutes);
router.use("/topics", topicRoutes);
router.use("/articles", articleRoutes);

module.exports = router;