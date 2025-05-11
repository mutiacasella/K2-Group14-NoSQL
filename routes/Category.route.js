const express = require("express");
const categoryRepo = require("../repositories/Category.repository");
const router = express.Router();

router.post("/add", categoryRepo.addCategory);
router.get("/", categoryRepo.getAllCategory);
router.get("/:categoryId", categoryRepo.getCategoryById);
router.put("/:categoryId", categoryRepo.updateCategory);
router.delete("/:categoryId", categoryRepo.deleteCategory);

module.exports = router;