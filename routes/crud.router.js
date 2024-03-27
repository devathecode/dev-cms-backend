const express = require("express")
const router = express.Router()

const crudController = require('../controller/crud.controller')

router.get("/", crudController.getAll)
router.post("/verify", crudController.verifyUser)
router.get("/:id", crudController.getById)
router.post("/", crudController.create)
router.put("/:id", crudController.updateById)
router.delete("/:id", crudController.deleteById)

module.exports = router