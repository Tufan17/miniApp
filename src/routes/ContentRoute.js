const express = require("express");
const authenticate = require("../middleware/authenticate")
const ContentController = require("../controllers/ContentController");
const {createValidation,updateValidation} = require("../validations/ContentValidation")
const validate = require("../middleware/validate")
const authorized = require("../middleware/authorized")
const router = express.Router();






router.get("/",authenticate,ContentController.findAll)
router.get("/:id",authenticate,ContentController.findById)
router.post("/",authenticate,authorized,validate(createValidation),ContentController.create)
router.put("/:id",authenticate,authorized,validate(updateValidation),ContentController.update)
router.delete("/:id",authenticate,authorized,ContentController.delete)

module.exports = router