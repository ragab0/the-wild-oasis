import type { Cabin } from "./cabin";
import type { Guest } from "./guest";

export interface Booking {
  id: number;
  cabin_id: number;
  guest_id: number;
  created_at: string;
  updated_at: string;
  start_date: string;
  end_date: string;
  total_nights: number;
  total_guests: number;

  is_paid: boolean;
  has_breakfast: boolean;
  cabin_price: number;
  extra_price: number;
  total_price: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  observations: string;

  guests: Guest;
  cabins: Cabin;
}
