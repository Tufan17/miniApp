const express = require("express");
const userRoutes = require("./UserRoute");
const authRoutes = require("./authRoute");
const seedData = require("../seeds");
const levelRoutes = require("./LevelRoute");
const wordSoupRoutes = require("./WordSoupRoute");
const roleRoutes = require("./roleRoute");
const userLevelRoutes = require("./UserLevelRoute");
const contentRoutes = require("./ContentRoute");
const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/levels", levelRoutes);
router.use("/roles", roleRoutes);
router.use("/word-soups", wordSoupRoutes);
router.use("/contents", contentRoutes);
router.use("/user-levels", userLevelRoutes);



router.get("/seed", (req, res) => {
  seedData();
  res.send("Seed data created");
});

module.exports = router;
