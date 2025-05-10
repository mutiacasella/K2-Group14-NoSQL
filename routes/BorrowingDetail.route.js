const express = require("express");
const borrowingRepo = require("../repositories/BorrowingDetail.repository");
const router = express.Router();

router.post("/add", borrowingRepo.addBorrowing);
router.get("/", borrowingRepo.getAllBorrowings);
router.get("/borrower/:borrowerId", borrowingRepo.getBorrowingsByBorrowerId); // pindahkan ke ATAS
router.get("/:borrowingId", borrowingRepo.getBorrowingById);
router.put("/return/:borrowingId", borrowingRepo.returnBook);
router.delete("/:borrowingId", borrowingRepo.deleteBorrowing);

module.exports = router;