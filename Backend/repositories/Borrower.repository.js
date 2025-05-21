const Borrower = require("../models/BorrowerModel");
const bcrypt = require("bcrypt");

// Register Borrower
async function addBorrower(req, res) {
    try {
        const { name, address, phone_number, email, password } = req.body;

        if (!password || password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        }

        const borrower = new Borrower({
            name,
            address,
            phone_number,
            email,
            password
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

// Login Borrower
async function loginBorrower(req, res) {
    try {
        const { email, password } = req.body;

        const borrower = await Borrower.findOne({ email });
        if (!borrower) {
            throw new Error("Borrower not found");
        }

        const isMatch = await borrower.comparePassword(password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: borrower
        });
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        });
        console.log(`Login error: ${err.message}`);
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
        const { name, address, phone_number, email, password } = req.body;

        const updateFields = {
            name,
            address,
            phone_number,
            email
        };

        // Jika password dikirim, validasi dan hash dulu
        if (password) {
            if (password.length < 8) {
                throw new Error("Password must be at least 8 characters long");
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = hashedPassword;
        }

        const updatedBorrower = await Borrower.findByIdAndUpdate(
            borrowerId,
            updateFields,
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
    loginBorrower,
    getAllBorrowers,
    getBorrowerById,
    updateBorrower,
    deleteBorrower
}