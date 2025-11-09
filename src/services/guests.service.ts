import type { Guest } from "@/types/guest";
import supabase from "./supabase.service";

export const guestsService = {
  async getAllGuests(): Promise<Guest[]> {
    const { data, error } = await supabase.from("guests").select(`*`);

    if (error) throw error;
    return data;
  },
};
