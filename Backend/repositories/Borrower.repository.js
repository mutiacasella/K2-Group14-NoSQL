const Borrower = require("../models/BorrowerModel");

// Add Borrower
async function addBorrower(req, res) {
    try {
        const { name, address, phone_number, email } = req.body;

        const borrower = new Borrower({
            name: name,
            address: address,
            phone_number: phone_number,
            email: email
        });
        await borrower.save();

        res.status(200).json({
            success: true,
            message: "Successfully registered borrower",
            data: borrower
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(`Error Message: ${err.message}`);
    }
}

// Get All Borrowers (descending order)
async function getAllBorrowers(req, res) {
    try {
        const borrowers = await Borrower.find().sort({ updatedAt: -1 });
        res.status(200).json({
            success: true,
            message: "Successfully get all borrowers",
            data: borrowers
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(err);
    }
}

// Get Borrower By ID
async function getBorrowerById(req, res) {
    try {
        const { borrowerId } = req.params;
        const borrower = await Borrower.findOne({ _id: borrowerId });
        if (!borrower) {
            throw new Error("Borrower not found");
        }

        res.status(200).json({
            success: true,
            message: `Found borrower with id ${borrowerId}`,
            data: borrower
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(err);
    }
}

// Update Borrower
async function updateBorrower(req, res) {
    try {
        const { borrowerId } = req.params;
        const { name, address, phone_number, email } = req.body;

        const updatedBorrower = await Borrower.findByIdAndUpdate(
            borrowerId,
            {
                name: name,
                address: address,
                phone_number: phone_number,
                email: email
            },
            { new: true }
        );

        if (!updatedBorrower) {
            throw new Error("Borrower not found");
        }

        res.status(200).json({
            success: true,
            message: "Successfully updated borrower",
            data: updatedBorrower
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(`Error Message: ${err.message}`);
    }
}

// Delete Borrower
async function deleteBorrower(req, res) {
    try {
        const { borrowerId } = req.params;

        const deletedBorrower = await Borrower.findByIdAndDelete(borrowerId);

        if (!deletedBorrower) {
            throw new Error("Borrower not found");
        }

        res.status(200).json({
            success: true,
            message: "Successfully deleted borrower",
            data: deletedBorrower
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(`Error Message: ${err.message}`);
    }
}

module.exports = {
    addBorrower,
    getAllBorrowers,
    getBorrowerById,
    updateBorrower,
    deleteBorrower
}