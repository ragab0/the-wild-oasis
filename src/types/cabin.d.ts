import type {
  createCabinSchema,
  updateCabinSchema,
} from "@/validations/cabin.validation";

export interface Cabin {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  capacity: number;
  price: number;
  discount: number;
  description: string;
  image: string | null;
}

export type CreateCabinFormData = z.infer<typeof createCabinSchema>;
export type UpdateCabinData = z.infer<typeof updateCabinSchema>;
