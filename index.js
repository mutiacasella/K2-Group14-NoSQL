require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const bookRoutes = require('./routes/Book.route');
const borrowerRoutes = require('./routes/Borrower.route');
const borrowingDetailRoutes = require('./routes/BorrowingDetail.route');
const categoryRoutes = require('./routes/Category.route');

const port = process.env.PORT || 8080;
const app = express();

// connect to database
db.connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

// status
app.get('/status', (req, res) => {
    res.status(200).send({ status: "Server is running" });
});

// routes
app.use("/book", bookRoutes);
app.use("/borrower", borrowerRoutes);
app.use("/borrowing", borrowingDetailRoutes);
app.use("/category", categoryRoutes);

// listen
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});