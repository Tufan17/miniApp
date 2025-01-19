// require the necessary libraries
const SeedModel = require("../models/SeedModel");
const RoleSeed = require("./RoleSeed");
const UserSeed = require("./UserSeed");
const mongoose = require("mongoose");
async function seedData() {
  const seed = await SeedModel.find();
  const userSeed = seed.find((item) => item.key === "user");
  const roleSeed = seed.find((item) => item.key === "role");

  if (!roleSeed.status) {
    await RoleSeed();
    await SeedModel.findByIdAndUpdate(
      roleSeed._id,
      { status: true },
      { new: true }
    );
  }
  if (!userSeed.status) {
    await UserSeed();
    await SeedModel.findByIdAndUpdate(
      userSeed._id,
      { status: true },
      { new: true }
    );
  }
}

module.exports = seedData;
