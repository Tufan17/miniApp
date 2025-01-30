const express = require("express");
const userRoutes = require("./UserRoute");
const authRoutes = require("./authRoute");
const seedData = require("../seeds");
const levelRoutes = require("./LevelRoute");
const wordSoupRoutes = require("./WordSoupRoute");
const roleRoutes = require("./roleRoute");
const contentRoutes = require("./contentRoute");
const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/levels", levelRoutes);
router.use("/roles", roleRoutes);
router.use("/word-soups", wordSoupRoutes);
router.use("/contents", contentRoutes);
router.get("/seed", (req, res) => {
  seedData();
  res.send("Seed data created");
});

module.exports = router;
