import { bookingsService } from "@/services/bookings.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner"; // or your toast library

/** keys */

export const bookingsKeys = {
  all: ["bookings"] as const,
  stats: (numDays: number) => [...bookingsKeys.all, `last-${numDays}`] as const,
  single: (id: number) => [...bookingsKeys.all, id] as const,
};

/** queries */

export function useGetAllBookings() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "all";
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const sortBy = searchParams.get("sortBy") || "created_at";
  const sortDirection = (searchParams.get("sortDirection") || "desc") as "asc" | "desc";

  return useQuery({
    queryKey: [...bookingsKeys.all, { status, page, pageSize, sortBy, sortDirection }],
    queryFn: () => bookingsService.getAllBookings({ 
      status, 
      page, 
      pageSize,
      sortBy,
      sortDirection
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

export function useGetBookingsStatsPeriod() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 0
    : Number(searchParams.get("last"));

  return useQuery({
    queryFn: () => bookingsService.getBookingsStatsPeriod(numDays),
    queryKey: bookingsKeys.stats(numDays),
  });
}

export function useGetBookingById(id: number) {
  return useQuery({
    queryKey: bookingsKeys.single(id),
    queryFn: () => bookingsService.getBookingById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
}

/** mutations */

export function useCheckInBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => bookingsService.checkInBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingsKeys.all });
      toast.success("Booking successfully checked in");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to check in booking");
    },
  });
}

export function useCheckOutBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => bookingsService.checkOutBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingsKeys.all });
      toast.success("Booking successfully checked out");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to check out booking");
    },
  });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => bookingsService.deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingsKeys.all });
      toast.success("Booking successfully deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete booking");
    },
  });
}
