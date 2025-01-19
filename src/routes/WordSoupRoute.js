const express = require("express");
const authenticate = require("../middleware/authenticate")
const WordSoupController = require("../controllers/WordSoupController");
const {createValidation,updateValidation} = require("../validations/WordSoupValidation")
const authorized = require("../middleware/authorized")
const router = express.Router();
const validate = require("../middleware/validate")





router.get("/",authenticate,WordSoupController.findAll)
router.get("/:id",authenticate,WordSoupController.findById)
router.post("/",authenticate,authorized,validate(createValidation),WordSoupController.create)
router.put("/:id",authenticate,authorized,validate(updateValidation),WordSoupController.update)
router.delete("/:id",authenticate,authorized,WordSoupController.delete)

module.exports = router