const Router = require('express')
const { categoryGetAll, categoryGetByID, categoryCreate, categoryDelete, categoryUpdate } = require('../controllers/category.controller')

const router = Router()

// GET
router.get("/", categoryGetAll)
router.get("/:id", categoryGetByID)

// POST
router.post("/", categoryCreate)

// PUT
router.put("/:id", categoryUpdate)

// DELETE
router.delete("/:id", categoryDelete)

module.exports = router