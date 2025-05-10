const mongoose = require('mongoose');

const borrowingDetailSchema = new mongoose.Schema({
    borrower_id: { type: mongoose.Schema.Types.ObjectId, ref: "Borrower", required: true },
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    borrow_date: { type: Date, required: true },
    due_date: { type: Date },
    return_date: { type: Date },
    status: { type: String, enum: ["borrowed", "returned", "overdue"], required: true },
}, { timestamps: true });

const BorrowingDetail = mongoose.model("BorrowingDetail", borrowingDetailSchema);

module.exports = BorrowingDetail;