const express = require("express");
const borrowerRepo = require("../repositories/Borrower.repository");
const router = express.Router();

router.post("/add", borrowerRepo.addBorrower);
router.get("/", borrowerRepo.getAllBorrowers);
router.get("/:borrowerId", borrowerRepo.getBorrowerById);
router.put("/:borrowerId", borrowerRepo.updateBorrower);
router.delete("/:borrowerId", borrowerRepo.deleteBorrower);

module.exports = router;