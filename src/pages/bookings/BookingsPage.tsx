import { StatusFilter } from "@/components/Filter";
import { useGetAllBookings } from "@/hooks/useBookings";
import BookingTable from "./components/BookingTable";

export default function BookingsPage() {
  const { data, isLoading } = useGetAllBookings();

  return (
    <>
      <div className="flex justify-between items-center gap-5">
        <h1>All Bookings</h1>
        <StatusFilter />
      </div>
      <BookingTable
        bookings={data?.data || []}
        count={data?.count || 0}
        isLoading={isLoading}
      />
    </>
  );
}
