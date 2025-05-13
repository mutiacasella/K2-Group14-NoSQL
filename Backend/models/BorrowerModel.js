const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
}, { timestamps: true });

const Borrower = mongoose.model("Borrower", borrowerSchema);

module.exports = Borrower;