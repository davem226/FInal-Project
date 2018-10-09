const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth");

router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

// If no routes are hit, send the React app
router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;