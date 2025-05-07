const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publication_year: { type: Number, required: true },
    total_quantity: { type: Number, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
