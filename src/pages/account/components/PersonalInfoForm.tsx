import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser, useUser } from "@/hooks/useAuth";
import { useRef, useState } from "react";
import { updateUserSchema } from "@/validations/auth.validation";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import type { UpdateUserInfoFormData } from "@/types/auth";
import OurFormField from "@/components/OurFormField";

export default function PersonalInfoForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<File>();
  const { data: userData } = useUser();
  const { mutate, isPending } = useUpdateUser();
  const user = userData?.user;

  const form = useForm<UpdateUserInfoFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: user?.user_metadata?.full_name || "",
      email: user?.email || "",
    },
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, errors },
  } = form;

  function submitHandler(data: UpdateUserInfoFormData) {
    mutate(
      {
        fullName: data.fullName,
        email: data.email,
        avatar,
        hasOldAvatarUrl: user?.user_metadata?.avatar_url,
      },
      {
        onSuccess: function () {
          reset(data);
          setAvatar(undefined);
        },
      }
    );
  }

  function fileChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setAvatar(file);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : user?.user_metadata?.avatar_url
              }
              alt={user?.user_metadata?.full_name}
            />
            <AvatarFallback>
              {user?.user_metadata?.full_name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileRef.current?.click()}
              disabled={isPending}
            >
              Change Avatar
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
              ref={fileRef}
              className="hidden"
            />
          </div>
        </div>
        <OurFormField
          control={control}
          label="full name"
          name="fullName"
          type="text"
          error={errors.fullName}
          itemStyle=" "
        />
        <OurFormField
          control={control}
          label="email address"
          name="email"
          type="email"
          error={errors.email}
          itemStyle=" "
        />
        <Button type="submit" disabled={isPending || (!isDirty && !avatar)}>
          {isPending ? [<Loader2 />, "Updating "] : "Update "}
          Profile
        </Button>
      </form>
    </Form>
  );
}
