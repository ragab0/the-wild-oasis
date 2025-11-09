import type { Booking } from "@/types/booking";
import supabase from "./supabase.service";

export const bookingsService = {
  // for dashboard stats
  getBookingsStatsPeriod: async function (last = 0) {
    const query = supabase
      .from("bookings")
      .select("*, guests(country_flag, full_name)");
    if (last) {
      const today = new Date();
      const date = new Date(today);
      date.setDate(today.getDate() - last);
      query
        .gte("created_at", date.toISOString().split("T")[0])
        .lte("created_at", today.toISOString().split("T")[0]);
    }

    const { data, error } = await query;
    if (error) {
      console.error(error);
      throw new Error("Bookings could not be loaded");
    }
    return data;
  },

  getAllBookings: async function ({
    page = 1,
    pageSize = 10,
    status = "all",
    sortBy = "created_at",
    sortDirection = "desc",
  }: {
    page?: number;
    pageSize?: number;
    status?: string;
    sortBy?: string;
    sortDirection?: "asc" | "desc";
  }): Promise<{ data: Booking[]; count: number }> {
    let query = supabase
      .from("bookings")
      .select("*, cabins(name), guests(full_name, email)", { count: "exact" });

    // status filter
    if (status !== "all") query = query.eq("status", status);

    // Apply sorting
    query = query.order(sortBy, { ascending: sortDirection === "asc" });

    // pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;
    if (error) {
      console.error(error);
      throw new Error("Bookings could not be loaded");
    }
    return { data: data || [], count: count || 0 };
  },

  getBookingById: async function (id: number): Promise<Booking> {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, guests(*), cabins(name)")
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
