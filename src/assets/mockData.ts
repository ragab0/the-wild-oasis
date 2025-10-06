import type { Cabin } from "@/types/cabine";

export const cabinsMockData: Cabin[] = [
  {
    id: 123,
    name: "cabine #one",
    capacity: 8,
    created_at: Date.now().toLocaleString(),
    updated_at: Date.now().toLocaleString(),
    description: "",
    discount: 50,
    image: null,
    price: 250,
  },
];
