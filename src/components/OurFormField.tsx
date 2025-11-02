import type React from "react";
import { Input } from "./ui/input";
import { type Control, type FieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";

interface props {
  control: Control;
  name: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"] | "textarea";
  label: string;
  autoCapitalize?: React.HTMLAttributes<HTMLInputElement>["autoCapitalize"];
  error?: FieldError;
  itemStyle?: React.HTMLAttributes<HTMLDivElement>["className"];
}

export default function OurFormField({
  control,
  name,
  type = "text",
  label,
  autoCapitalize = "none",
  error,
  itemStyle,
}: props) {
  const [isPass, setIsPass] = useState(type === "password");
  function togglePass() {
    setIsPass((prev) => !prev);
  }
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={itemStyle || "grid-cols-3 border-b py-3 mb-0"}>
          <FormLabel htmlFor={field.name} className="capitalize">
            {label}
          </FormLabel>
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
            ) : type === "password" ? (
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  type={isPass ? "password" : "text"}
                  aria-invalid={!!error}
                  {...field}
                />
                <InputGroupButton onClick={togglePass} className="m-1">
                  {isPass ? <Eye /> : <EyeOff />}
                </InputGroupButton>
              </InputGroup>
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
