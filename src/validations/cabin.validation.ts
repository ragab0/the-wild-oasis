import { z } from "zod";

export const createCabinSchema = z
  .object({
    name: z
      .string()
      .min(3, "Cabin name must be at least 3 characters")
      .max(100, "Cabin name must not exceed 100 characters")
      .trim(),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description must not exceed 1000 characters")
      .trim(),

    capacity: z.preprocess(
      (val) => (val === "" || val === null ? 0 : Number(val)),
      z
        .number()
        .int("Capacity must be a whole number")
        .positive("Capacity must be at least 1 guest")
        .max(20, "Capacity cannot exceed 20 guests")
    ),

    price: z.preprocess(
      (val) => (val === "" || val === null ? 0 : Number(val)),
      z
        .number()
        .nonnegative("Price cannot be negative")
        .max(1000, "Price cannot exceed $1,000")
        .default(0)
    ),

    discount: z.preprocess(
      (val) => (val === "" || val === null ? 0 : Number(val)),
      z.number().nonnegative("Discount cannot be negative").default(0)
    ),

    image: z
      .instanceof(File)
      .refine((file) => file.size <= 2 * 1024 * 1024, {
        message: "File size must be less than 2MB",
      })
      .refine((file) => file.type.startsWith("image/"), {
        message: "Only image files are allowed",
      })
      .nullable(),
  })
  .superRefine((data, ctx) => {
    // Validate discount against price
    if (data.discount > data.price) {
      ctx.addIssue({
        code: "custom",
        message: "Discount cannot exceed price",
        path: ["discount"],
      });
    }
  });

export const updateCabinSchema = createCabinSchema.partial();
