import type {
  createCabinSchema,
  updateCabinSchema,
} from "@/validations/cabin.validation";

export interface Cabin {
  id: number;
  name: string;
  capacity: number;
  created_at: string;
  updated_at: string;
  description: string;
  discount: number;
  image: string | null;
  price: number;
}

export type CreateCabinFormData = z.infer<typeof createCabinSchema>;
export type UpdateCabinData = z.infer<typeof updateCabinSchema>;
