import type { Booking } from "@/types/booking";
import supabase from "./supabase.service";

export const bookingsService = {
  getAllBookings: async function (): Promise<Booking[]> {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, cabins(name), guests(full_name, email)");
    if (error) {
      console.error(error);
      throw new Error("Bookings could not be loaded");
    }
    return data;
  },

  getBookingById: async function (id: number): Promise<Booking> {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      throw new Error("Booking could not be loaded");
    }
    return data;
  },

  checkInBooking: async function (id: number): Promise<Booking> {
    const { data, error } = await supabase
      .from("bookings")
      .update({ status: "checked-in" })
      .eq("id", id)
      .single();
    if (error) {
      console.error(error);
      throw new Error("Booking could not be checked in");
    }
    return data;
  },

  checkOutBooking: async function (id: number): Promise<Booking> {
    const { data, error } = await supabase
      .from("bookings")
      .update({ status: "checked-out" })
      .eq("id", id)
      .single();
    if (error) {
      console.error(error);
      throw new Error("Booking could not be checked out");
    }
    return data;
  },

  deleteBooking: async function (id: number): Promise<void> {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      console.error(error);
      throw new Error("Booking could not be deleted");
    }
  },
};
