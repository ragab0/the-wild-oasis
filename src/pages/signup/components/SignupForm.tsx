import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useSignUp } from "@/hooks/useAuth";
import { signupSchema } from "@/validations/auth.validation";
import { Loader2, LogIn } from "lucide-react";
import type { SignupFormData } from "@/types/auth";
import OurFormField from "@/components/OurFormField";
import { Button } from "@/components/ui/button";

export default function SignupForm() {
  const { mutate, isPending } = useSignUp();
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
    mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
      </form>
    </Form>
  );
}
