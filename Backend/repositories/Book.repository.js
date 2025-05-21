const Book = require("../models/BookModel");

// Add Book
async function addBook(req, res) {
    try {
        const { title, author, publication_year, total_quantity, category_id } = req.body;

        const cover_image = req.file?.path;
        if (!cover_image) {
            throw new Error("Book image is required");
        }

        const book = new Book({
            title,
            author,
            publication_year,
            total_quantity,
            category_id,
            cover_image
        });

        await book.save();

        res.status(200).json({
            success: true,
            message: "Successfully Registered Book",
            data: book
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(`Error Message: ${err.message}`);
    }
}

// Get All Book
async function getAllBook(req, res) {
    try {
        const books = await Book.find().sort({ updatedAt: -1 });
        res.status(200).json({
            success: true,
            message: "Successfully get all books",
            data: books
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(err);
    }
}

// Get Book By ID
async function getBookById(req, res) {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }

        res.status(200).json({
            success: true,
            message: `Found book with id ${bookId}`,
            data: book
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(err);
    }
}

// Get Books By Category ID
async function getBooksByCategory(req, res) {
    try {
        const { categoryId } = req.params;
        const books = await Book.find({ category_id: categoryId });

        res.status(200).json({
            success: true,
            message: `Successfully retrieved books in category ${categoryId}`,
            data: books
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(`Error Message: ${err.message}`);
    }
}

// Update Book
async function updateBook(req, res) {
    try {
        const { bookId } = req.params;
        const { title, author, publication_year, total_quantity, category_id } = req.body;

        const updateData = {
            title,
            author,
            publication_year,
            total_quantity,
            category_id
        };

        if (req.file?.path) {
            updateData.cover_image = req.file.path;
        }

        const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { new: true });

        if (!updatedBook) {
            throw new Error("Book not found");
        }

        res.status(200).json({
            success: true,
            message: "Successfully updated book",
            data: updatedBook
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(`Error Message: ${err.message}`);
    }
}

// Delete Book
async function deleteBook(req, res) {
    try {
        const { bookId } = req.params;
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            throw new Error("Book not found");
        }

        res.status(200).json({
            success: true,
            message: "Successfully deleted book",
            data: deletedBook
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
    addBook,
    getAllBook,
    getBookById,
    getBooksByCategory,
    updateBook,
    deleteBook
};