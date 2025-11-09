import type {
  loginSchema,
  updateUserSchema,
  updatePasswordSchema,
} from "@/validations/auth.validation";

export type LoginFormData = z.infer<typeof loginSchema>;
export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupFormData = z.infer<typeof signupSchema>;
export type SignUpCredentials = LoginCredentials & {
  fullName: string;
};

export type UpdateUserInfoFormData = z.infer<typeof updateUserSchema>;
export type UpdateUserPasswordFormData = z.infer<typeof updatePasswordSchema>;
