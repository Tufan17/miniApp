const express = require("express");
const authenticate = require("../middleware/authenticate")
const RoleController = require("../controllers/RoleController");
const {createValidation,updateValidation} = require("../validations/RoleValidation.js")
const validate = require("../middleware/validate")
const authorized = require("../middleware/authorized")
const router = express.Router();






router.get("/",authenticate,RoleController.findAll)
router.get("/:id",authenticate,RoleController.findById)
router.post("/",authenticate,authorized,validate(createValidation),RoleController.create)
router.put("/:id",authenticate,authorized,validate(updateValidation),RoleController.update)
router.delete("/:id",authenticate,authorized,RoleController.delete)

module.exports = router