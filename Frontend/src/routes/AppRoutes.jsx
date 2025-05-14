import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/profile/Profile';
import FormDaftarBorrower from '../pages/FormDaftarBorrower';


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/about" element={<Profile />} />
            <Route path="/daftar" element={<FormDaftarBorrower />} />
        </Routes>
    );
}
