import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import LoginPage from "./pages/login/LoginPage";
import AccountPage from "./pages/account/AccountPage";
import SettingsPage from "./pages/settings/SettingsPage";
import UsersPage from "./pages/users/UsersPage";
import CabinsPage from "./pages/cabins/CabinsPage";
import BookingsPage from "./pages/bookings/BookingsPage";
import SignupPage from "./pages/signup/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicedRoute from "./components/PublicedRoute";
import { ThemeProvider } from "./providers/ThemeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. protected dashboard */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<HomePage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="cabins" element={<CabinsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="account" element={<AccountPage />} />
            </Route>
            {/* 2. public pages - for non-signed in users */}
            <Route element={<PublicedRoute />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
            </Route>
            {/* 3. not found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
