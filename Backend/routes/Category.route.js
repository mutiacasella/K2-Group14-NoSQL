const express = require("express");
const categoryRepo = require("../repositories/Category.repository");
const router = express.Router();

router.post("/add", categoryRepo.addCategory); // ga kepake
router.get("/", categoryRepo.getAllCategory); // ga kepake
router.get("/:categoryId", categoryRepo.getCategoryById); // ga kepake
router.put("/:categoryId", categoryRepo.updateCategory); // ga kepake
router.delete("/:categoryId", categoryRepo.deleteCategory); // ga kepake

module.exports = router;