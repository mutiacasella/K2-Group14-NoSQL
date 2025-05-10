const express = require("express");
const bookRepo = require("../repositories/Book.repository");
const router = express.Router();

router.post("/add", bookRepo.addBook);
router.get("/category/:categoryId", bookRepo.getBooksByCategory);
router.get("", bookRepo.getAllBook);
router.get("/:bookId", bookRepo.getBookById);
router.put("/:bookId", bookRepo.updateBook);
router.delete("/:bookId", bookRepo.deleteBook);

module.exports = router;