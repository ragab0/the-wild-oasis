import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLogin } from "@/hooks/useAuth";
import { loginSchema } from "@/validations/auth.validation";
import { ArrowRight, Loader2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import type { LoginFormData } from "@/types/auth";
import OurFormField from "@/components/OurFormField";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "ragab.dev@gmail.com",
      password: "12345678",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = form;

  function onSubmit(data: LoginFormData) {
    login(data);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-10">
        <Logo />
        <h2 className="text-3xl text-center">Login to your account</h2>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-lg bg-white px-6 py-8 shadow sm:px-10"
          >
            <OurFormField
              control={control}
              label="email"
              name="email"
              type="email"
              error={errors.email}
              itemStyle=" "
            />
            <OurFormField
              control={control}
              label="password"
              name="password"
              type="password"
              error={errors.password}
              itemStyle=" "
            />
            {/* Forgot Password Link */}
            {/* <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-xs font-medium flex items-center gap-1 underline"
              >
                <Shield className="h-[14px] w-[14px]" />
                Forgot your password?
              </Link>
            </div> */}
            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            {/* Sign Up CTA Section */}
            <div className="border-t border-gray-200 px-8 py-6 sm:px-10">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  New to our platform?
                </p>
                <Link to="/signup">
                  <Button
                    variant="outline"
                    className="w-full font-medium py-2.5 rounded-xl transition-all duration-200 group"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create your account
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
