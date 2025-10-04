import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import LoginPage from "./pages/login/LoginPage";
import AccountPage from "./pages/account/AccountPage";
import SettingsPage from "./pages/settings/SettingsPage";
import UsersPage from "./pages/users/UsersPage";
import CabinsPage from "./pages/cabins/CabinsPage";
import BookingsPage from "./pages/bookings/BookingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<HomePage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="cabins" element={<CabinsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
