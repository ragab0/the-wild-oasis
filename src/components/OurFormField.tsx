import type React from "react";
import { Input } from "./ui/input";
import { type Control, type FieldError } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

interface props {
  control: Control;
  name: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"] | "textarea";
  label: string;
  autoCapitalize?: React.HTMLAttributes<HTMLInputElement>["autoCapitalize"];
  error?: FieldError;
}

export default function OurFormField({
  control,
  name,
  type = "text",
  label,
  autoCapitalize = "none",
  error,
}: props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid-cols-3 border-b py-3 mb-0">
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea
                id={field.name}
                {...field}
                autoCapitalize={autoCapitalize}
              />
            ) : type === "file" ? (
              <Input
                id={field.name}
                type="file"
                accept="image/*"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                {...(({ value, onChange, ...rest }) => rest)(field)}
                onChange={(event) =>
                  field.onChange(event.target.files?.[0] || null)
                }
              />
            ) : (
              <Input
                id={field.name}
                type={type}
                {...field}
                autoCapitalize={autoCapitalize}
              />
            )}
          </FormControl>
          <FormMessage>{error?.message || " "}</FormMessage>
        </FormItem>
      )}
    />
  );
}
