import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePassword } from "@/hooks/useAuth";
import { updatePasswordSchema } from "@/validations/auth.validation";
import { Form } from "@/components/ui/form";
import OurFormField from "@/components/OurFormField";
import { Loader2 } from "lucide-react";
import type { UpdateUserPasswordFormData } from "@/types/auth";

export default function PasswordForm() {
  const { mutate, isPending } = useUpdatePassword();
  const form = useForm<UpdateUserPasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = form;

  function submitHandler(data: UpdateUserPasswordFormData) {
    mutate(data.password);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        <OurFormField
          control={control}
          label="password"
          name="password"
          type="password"
          error={errors.password}
          itemStyle=" "
        />
        <OurFormField
          control={control}
          label="confirm password"
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword}
          itemStyle=" "
        />
        <Button type="submit" disabled={isPending || !isDirty}>
          {isPending ? [<Loader2 />, "Updating "] : "Update "}
          Password
        </Button>
      </form>
    </Form>
  );
}
