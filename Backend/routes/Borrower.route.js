const express = require("express");
const borrowerRepo = require("../repositories/Borrower.repository");
const router = express.Router();

router.post("/add", borrowerRepo.addBorrower);
router.get("/", borrowerRepo.getAllBorrowers); //ga kepake 
router.get("/:borrowerId", borrowerRepo.getBorrowerById); //ga kepake
router.put("/:borrowerId", borrowerRepo.updateBorrower); //ga kepake
router.delete("/:borrowerId", borrowerRepo.deleteBorrower); //ga kepake

module.exports = router;