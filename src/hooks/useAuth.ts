import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { LoginCredentials, SignUpCredentials } from "@/types/auth";
import authService from "@/services/auth.service";
import type { AuthError } from "@supabase/supabase-js";

/** keys */
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "current"] as const,
};

/** queries */
export function useUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authService.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/** mutations */
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      if (data.user) {
        // Update user cache
        queryClient.setQueryData(authKeys.user(), data);
        navigate("/dashboard");
        toast.success("Logged in successfully");
      }
    },
    onError: (err: AuthError) => {
      toast.error(
        err.code === "invalid_credentials"
          ? "Invalid email or password"
          : "Failed to login"
      );
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: SignUpCredentials) =>
      authService.signUp(credentials),
    onSuccess: (data) => {
      if (data.user) {
        // Update user cache
        queryClient.setQueryData(authKeys.user(), data);
        navigate("/dashboard");
        toast.success("Account created successfully");
      }
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create account");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      /* Clear auth-related cache BUT all */
      // queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.removeQueries();
      queryClient.clear();
      navigate("/login");
      toast.success("Logged out successfully");
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (email: string) => authService.resetPassword(email),
    onSuccess: () => {
      toast.success("Password reset email sent. Please check your inbox.");
    },
    onError: () => {
      toast.error("Failed to send password reset email");
    },
  });
}

export function useUpdatePassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newPassword: string) =>
      authService.updatePassword(newPassword),
    onSuccess: () => {
      toast.success("Password updated successfully");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Failed to update password");
    },
  });
}
