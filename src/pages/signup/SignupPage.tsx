import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSignUp } from "@/hooks/useAuth";
import { ArrowLeft, Loader2, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { signupSchema } from "@/validations/auth.validation";
import type { SignupFormData } from "@/types/auth";
import OurFormField from "@/components/OurFormField";
import Logo from "@/components/Logo";

export default function SignupPage() {
  const { mutate: signUp, isPending } = useSignUp();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = form;

  function onSubmit(data: SignupFormData) {
    signUp(data);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-10">
        <Logo />
        <h2 className="text-3xl text-center">Create your account</h2>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-lg bg-white px-6 py-8 shadow sm:px-10"
          >
            <OurFormField
              control={control}
              name="fullName"
              type="text"
              label="Full name"
              error={errors.fullName}
              itemStyle=" "
              autoCapitalize="words"
            />
            <OurFormField
              control={control}
              name="email"
              type="email"
              label="Email address"
              error={errors.email}
              itemStyle=" "
              autoCapitalize="none"
            />
            <OurFormField
              control={control}
              name="password"
              type="password"
              label="Password"
              error={errors.password}
              itemStyle=" "
            />
            <OurFormField
              control={control}
              name="confirmPassword"
              type="password"
              label="Confirm password"
              error={errors.confirmPassword}
              itemStyle=" "
            />
            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Create account
                </>
              )}
            </Button>

            {/* Back to login link */}
            <div className="mt-4 text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
