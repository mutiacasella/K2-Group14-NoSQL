const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const borrowerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

borrowerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

borrowerSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Borrower = mongoose.model("Borrower", borrowerSchema);
module.exports = Borrower;