import type { loginSchema } from "@/validations/auth.validation";

export type LoginFormData = z.infer<typeof loginSchema>;
export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupFormData = z.infer<typeof signupSchema>;
export type SignUpCredentials = LoginCredentials & {
  fullName: string;
};
