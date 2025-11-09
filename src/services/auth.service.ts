import supabase from "./supabase.service";
import type { LoginCredentials, SignUpCredentials } from "@/types/auth";

export const authService = {
  async login({ email, password }: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    return data;
  },

  async signUp({ email, password, fullName }: SignUpCredentials) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      throw error;
    }
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  },

  async getCurrentUser() {
    const { data } = await supabase.auth.getUser();
    return data;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) {
      throw error;
    }
  },

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      throw error;
    }
  },

  async updateUser({
    fullName,
    email,
    avatar,
    hasOldAvatarUrl,
  }: {
    fullName?: string;
    email?: string;
    avatar?: File;
    hasOldAvatarUrl?: string;
  }) {
    // Get current user to check for existing avatar
    const currentAvatarUrl = hasOldAvatarUrl;
    let avatarPath = currentAvatarUrl; // Keep current avatar by default

    if (avatar) {
      // Upload new avatar
      const fileName = `avatar-${Date.now()}-${avatar.name}`.replaceAll(
        "/",
        ""
      );
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

      if (uploadError) throw uploadError;

      // Set new avatar path
      avatarPath = `${
        import.meta.env.VITE_API_URL
      }/storage/v1/object/public/avatars/${fileName}`;

      // Delete old avatar if exists
      if (currentAvatarUrl) {
        const oldFileName = currentAvatarUrl.split("/avatars/").pop();
        if (oldFileName) {
          await supabase.storage.from("avatars").remove([oldFileName]);
        }
      }
    }

    const { data, error } = await supabase.auth.updateUser({
      email,
      data: {
        full_name: fullName,
        avatar_url: avatarPath,
      },
    });

    if (error) throw error;
    return data;
  },
};

export default authService;
