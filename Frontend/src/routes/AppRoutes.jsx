import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import FormDaftarBorrower from '../pages/FormDaftarBorrower';
import FormPengembalian from '../pages/FormPengembalian';
import BookDetail from '../pages/BookDetail';


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/daftar" element={<FormDaftarBorrower />} />
            <Route path="/pengembalian" element={<FormPengembalian />} />
            <Route path="/book/:bookId" element={<BookDetail />} />
        </Routes>
    );
}
