const BorrowingDetail = require("../models/BorrowingDetailModel");
const Book = require("../models/BookModel");

// Add Borrowing (Peminjaman Buku)
async function addBorrowing(req, res) {
    try {
        const { borrower_id, book_id, borrow_date } = req.body;
        const status = "borrowed";

        const book = await Book.findById(book_id);
        if (!book) {
            throw new Error("Book not found");
        }

        if (status === "borrowed") {
            if (book.total_quantity <= 0) {
                throw new Error("Book is out of stock");
            }
            book.total_quantity -= 1;
            await book.save();
        }

        // hitung due_date (max durasi peminjaman 1 bulan)
        const dueDate = new Date(borrow_date);
        dueDate.setMonth(dueDate.getMonth() + 1);

        // buat data peminjaman
        const borrowingDetail = new BorrowingDetail({
            borrower_id: borrower_id,
            book_id: book_id,
            borrow_date: borrow_date,
            due_date: dueDate,
            return_date: null,
            status: status
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
        const { borrowingId } = req.params;
        const borrowing = await BorrowingDetail.findOne({ _id: borrowingId })
            .populate("borrower_id")
            .populate("book_id");

        if (!borrowing) {
            throw new Error("Borrowing detail not found");
        }

        // cek dan update status overdue
        const now = new Date();
        if (borrowing.status === "borrowed" && borrowing.due_date < now) {
            borrowing.status = "overdue";
            await borrowing.save();
        }

        res.status(200).json({
            success: true,
            message: `Found borrowing detail with id ${borrowingId}`,
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

// Return Book (pengembalian buku)
async function returnBook(req, res) {
    try {
        const { borrowingId } = req.params;
        const { return_date } = req.body;

        // cari detail peminjaman berdasarkan ID
        const borrowing = await BorrowingDetail.findById(borrowingId);
        if (!borrowing) {
            throw new Error("Borrowing detail not found");
        }
        if (borrowing.status === "returned") {
            throw new Error("Book has already been returned");
        }

        // update status dan tanggal kembali
        borrowing.status = "returned";
        borrowing.return_date = return_date;
        await borrowing.save();

        // tambah kembali stok buku
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

module.exports = {
    addBorrowing,
    getAllBorrowings,
    getBorrowingById,
    getBorrowingsByBorrowerId,
    returnBook,
    deleteBorrowing
}