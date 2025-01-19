const express = require("express");
const authenticate = require("../middleware/authenticate")
const LevelController = require("../controllers/LevelController");
const {createValidation,updateValidation} = require("../validations/LevelValidation")
const validate = require("../middleware/validate")
const authorized = require("../middleware/authorized")
const router = express.Router();






router.get("/",authenticate,LevelController.findAll)
router.get("/:id",authenticate,LevelController.findById)
router.post("/",authenticate,authorized,validate(createValidation),LevelController.create)
router.put("/:id",authenticate,authorized,validate(updateValidation),LevelController.update)
router.delete("/:id",authenticate,authorized,LevelController.delete)

module.exports = router