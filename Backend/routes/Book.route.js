const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const bookRepo = require("../repositories/Book.repository");

const router = express.Router();

const upload = multer({ storage });

router.post("/add", upload.single("cover_image"), bookRepo.addBook);
router.get("/category/:categoryId", bookRepo.getBooksByCategory);
router.get("", bookRepo.getAllBook);
router.get("/:bookId", bookRepo.getBookById);
router.put("/:bookId", upload.single("cover_image"), bookRepo.updateBook);
router.delete("/:bookId", bookRepo.deleteBook); 

module.exports = router;