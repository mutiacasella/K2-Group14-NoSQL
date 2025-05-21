import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Return from '../pages/Return';
import BookDetail from '../pages/BookDetail';
import BorrowingDetail from '../pages/BorrowingDetail';


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/return" element={<Return />} />
            <Route path="/book/:bookId" element={<BookDetail />} />
            <Route path="/borrowing/:borrowingId" element={<BorrowingDetail />} />
        </Routes>
    );
}
