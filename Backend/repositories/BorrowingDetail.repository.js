const BorrowingDetail = require("../models/BorrowingDetailModel");
const Book = require("../models/BookModel");

// Add Borrowing
async function addBorrowing(req, res) {
    try {
        const { borrower_id, book_id, borrow_date } = req.body;
        const status = "borrowed";

        const book = await Book.findById(book_id);
        if (!book) {
            throw new Error("Book not found");
        }

        if (book.total_quantity <= 0) {
            throw new Error("Book is out of stock");
        }
        book.total_quantity -= 1;
        await book.save();

        // Ambil 4 top books
        const topBorrowed = await BorrowingDetail.aggregate([
            { $group: { _id: "$book_id", total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $limit: 4 }
        ]);
        const topBookIds = topBorrowed.map(b => b._id.toString());

        // Batas peminjaman tergantung buku
        const borrowDateObj = new Date(borrow_date);
        const dueDate = new Date(borrowDateObj);
        if (topBookIds.includes(book_id.toString())) {
            dueDate.setDate(dueDate.getDate() + 14); // 2 minggu
        } else {
            dueDate.setMonth(dueDate.getMonth() + 1); // 1 bulan
        }

        const borrowingDetail = new BorrowingDetail({
            borrower_id,
            book_id,
            borrow_date: borrowDateObj,
            due_date: dueDate,
            return_date: null,
            status
        });

        await borrowingDetail.save();

        res.status(200).json({
            success: true,
            message: "Successfully borrowed book",
            data: borrowingDetail
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(`Error Message: ${err.message}`);
    }
}

// Get All Borrowings (descending order)
async function getAllBorrowings(req, res) {
    try {
        const borrowings = await BorrowingDetail.find()
            .populate("borrower_id")
            .populate("book_id")
            .sort({ updatedAt: -1 });

        // cek dan update status overdue
        const now = new Date();
        for (let borrowing of borrowings) {
            if (borrowing.status === "borrowed" && borrowing.due_date < now) {
                borrowing.status = "overdue";
                await borrowing.save();
            }
        }

        res.status(200).json({
            success: true,
            message: "Successfully get all borrowings",
            data: borrowings
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(err);
    }
}

// Get Borrowing By ID
async function getBorrowingById(req, res) {
    try {
        const { status } = req.query;

        const filter = {};
        if (status) {
            filter.status = status;
        }

        const borrowings = await BorrowingDetail.find(filter)
            .populate("borrower_id")
            .populate("book_id")
            .sort({ updatedAt: -1 });

        const now = new Date();
        for (let borrowing of borrowings) {
            if (borrowing.status === "borrowed" && borrowing.due_date < now) {
                borrowing.status = "overdue";
                await borrowing.save();
            }
        }

        res.status(200).json({
            success: true,
            message: "Successfully get all borrowings",
            data: borrowings
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(err);
    }
}

// Get Borrowing History By Borrower ID
async function getBorrowingsByBorrowerId(req, res) {
    try {
        const { borrowerId } = req.params;

        const borrowings = await BorrowingDetail.find({ borrower_id: borrowerId })
            .populate("borrower_id")
            .populate("book_id")
            .sort({ updatedAt: -1 });

        // cek dan update status overdue
        const now = new Date();
        for (let borrowing of borrowings) {
            if (borrowing.status === "borrowed" && borrowing.due_date < now) {
                borrowing.status = "overdue";
                await borrowing.save();
            }
        }

        res.status(200).json({
            success: true,
            message: `Successfully retrieved borrowings for borrower ${borrowerId}`,
            data: borrowings
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(err);
    }
}

// Return Book
async function returnBook(req, res) {
    try {
        const { borrowing_id } = req.body;

        if (!borrowing_id) {
            throw new Error("Borrowing ID is required");
        }

        const borrowing = await BorrowingDetail.findById(borrowing_id);
        if (!borrowing) {
            throw new Error("Borrowing detail not found");
        }
        if (borrowing.status === "returned") {
            throw new Error("Book has already been returned");
        }

        // otomatis pakai tanggal sekarang
        const returnDate = new Date();
        borrowing.return_date = returnDate;

        if (returnDate > borrowing.due_date) {
            borrowing.status = "overdue";
        } else {
            borrowing.status = "returned";
        }

        await borrowing.save();

        const book = await Book.findById(borrowing.book_id);
        if (book) {
            book.total_quantity += 1;
            await book.save();
        }

        res.status(200).json({
            success: true,
            message: "Successfully returned book",
            data: borrowing
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(err);
    }
}

// Delete Borrowing Detail
async function deleteBorrowing(req, res) {
    try {
        const { borrowingId } = req.params;

        const deletedBorrowing = await BorrowingDetail.findByIdAndDelete(borrowingId);

        if (!deletedBorrowing) {
            throw new Error("Borrowing detail not found");
        }

        res.status(200).json({
            success: true,
            message: "Successfully deleted borrowing detail",
            data: deletedBorrowing
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(err);
    }
}

// Get Borrowing Statistics
async function getBorrowingStats(req, res) {
    try {
        const totalBorrowedRecords = await BorrowingDetail.countDocuments({});
        const currentlyBorrowed = await BorrowingDetail.countDocuments({ status: "borrowed" });
        const overdueCount = await BorrowingDetail.countDocuments({ status: "overdue" });

        res.status(200).json({
            success: true,
            message: "Successfully retrieved borrowing statistics",
            data: {
                totalBorrowedRecords,
                currentlyBorrowed,
                overdueCount
            }
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.log(err);
    }
}

// Get Top 4 Most Borrowed Books
async function getTopBorrowedBooks(req, res) {
    try {
        const result = await BorrowingDetail.aggregate([
            {
                $group: {
                    _id: "$book_id",
                    totalBorrowed: { $sum: 1 }
                }
            },
            { $sort: { totalBorrowed: -1 } },
            { $limit: 4 },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            { $unwind: "$book" }
        ]);

        res.status(200).json({
            success: true,
            message: "Successfully retrieved top 4 borrowed books",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
        console.log(`Error Message: ${err.message}`);
    }
}

module.exports = {
    addBorrowing,
    getAllBorrowings,
    getBorrowingById,
    getBorrowingsByBorrowerId,
    returnBook,
    deleteBorrowing,
    getBorrowingStats,
    getTopBorrowedBooks
};