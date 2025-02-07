const express = require("express");
const authenticate = require("../middleware/authenticate")
const CEFRController = require("../controllers/CEFRController");
const {createValidation,updateValidation} = require("../validations/CefrValidation")
const validate = require("../middleware/validate")
const authorized = require("../middleware/authorized")
const router = express.Router();






router.get("/",authenticate,CEFRController.findAll)
router.get("/level/:id",authenticate,CEFRController.findAllLevel)

router.get("/:id",authenticate,CEFRController.findById)
router.post("/",authenticate,authorized,validate(createValidation),CEFRController.create)
router.put("/:id",authenticate,authorized,validate(updateValidation),CEFRController.update)
router.delete("/:id",authenticate,authorized,CEFRController.delete)

module.exports = router