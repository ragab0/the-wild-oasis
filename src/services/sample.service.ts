import supabase from "./supabase.service";
import { isFuture, isPast, isToday } from "date-fns";
import { subtractDates } from "../utils/helpers";
import {
  bookingsMockData,
  cabinsMockData,
  guestsMockData,
} from "@/assets/mockData";
import type { Cabin } from "@/types/cabin";

export const sampleService = {
  resetAll: async function () {
    const { error } = await supabase.rpc("reset_all_tables");
    if (error) console.error(error.message);
    else console.log("✅ All tables reset successfully!");
  },

  createGuests: async function () {
    const { error } = await supabase.from("guests").insert(guestsMockData);
    if (error) console.log(error.message);
  },

  createCabins: async function () {
    const { error } = await supabase.from("cabins").insert(cabinsMockData);
    if (error) console.log(error.message);
  },

  // Bookings need a guest_id and a cabin_id. We can't tell Supabase IDs for each object,
  // it will calculate them on its own. So it might be different for different people,
  // especially after multiple uploads. Therefore, we need to first get all guest_ids and cabin_ids,
  // and then replace the original IDs in the booking data with the actual ones from the DB
  createBookings: async function () {
    const { data: guestsIds } = await supabase
      .from("guests")
      .select("id")
      .order("id");
    const allGuestIds = (guestsIds ?? []).map((cabin) => cabin.id);
    const { data: cabinsIds } = await supabase
      .from("cabins")
      .select("id")
      .order("id");
    const allCabinIds = (cabinsIds ?? []).map((cabin) => cabin.id);
    const finalBookings = bookingsMockData.map((booking) => {
      // Here relying on the order of cabins, as they don't have and ID yet
      const cabin = cabinsMockData.at(booking.cabin_id - 1) as Cabin;
      const numNights = subtractDates(booking.end_date, booking.start_date);
      const cabinPrice = numNights * (cabin.price - cabin.discount);
      const extrasPrice = booking.has_breakfast
        ? numNights * 15 * booking.total_guests
        : 0;
      const totalPrice = cabinPrice + extrasPrice;
      let status;
      if (
        isPast(new Date(booking.end_date)) &&
        !isToday(new Date(booking.end_date))
      )
        status = "checked-out";
      if (
        isFuture(new Date(booking.start_date)) ||
        isToday(new Date(booking.start_date))
      )
        status = "unconfirmed";
      if (
        (isFuture(new Date(booking.end_date)) ||
          isToday(new Date(booking.end_date))) &&
        isPast(new Date(booking.start_date)) &&
        !isToday(new Date(booking.start_date))
      )
        status = "checked-in";

      return {
        ...booking,
        total_nights: numNights,
        cabin_price: cabinPrice,
        extra_price: extrasPrice,
        total_price: totalPrice,
        guest_id: allGuestIds.at(booking.guest_id - 1),
        cabin_id: allCabinIds.at(booking.cabin_id - 1),
        status,
      };
    });

    console.log(finalBookings);
    const { error } = await supabase.from("bookings").insert(finalBookings);
    if (error) console.log(error.message);
  },
};
