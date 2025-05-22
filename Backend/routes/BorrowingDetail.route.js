const express = require("express");
const borrowingRepo = require("../repositories/BorrowingDetail.repository");
const router = express.Router();

router.post("/add", borrowingRepo.addBorrowing);
router.put("/return", borrowingRepo.returnBook); 
router.get("/stats", borrowingRepo.getBorrowingStats);
router.get("/topborrowed", borrowingRepo.getTopBorrowedBooks);
router.get("/", borrowingRepo.getAllBorrowings);
router.get("/borrower/:borrowerId", borrowingRepo.getBorrowingsByBorrowerId); 
router.get("/:borrowingId", borrowingRepo.getBorrowingById); 
router.delete("/:borrowingId", borrowingRepo.deleteBorrowing); 

module.exports = router;