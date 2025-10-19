import { bookingsService } from "@/services/bookings.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // or your toast library

/** keys */

export const bookingsKeys = {
  all: ["bookings"] as const,
  single: (id: number) => [...bookingsKeys.all, id] as const,
};

/** queries */

export function useGetAllBookings() {
  return useQuery({
    queryKey: bookingsKeys.all,
    queryFn: bookingsService.getAllBookings,
    staleTime: Infinity,
    retry: 1,
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
