import BookingTable from "./components/BookingTable";

export default function BookingsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-5">
        <h1>All Bookings</h1>
        <p>Filter / Sort</p>
      </div>
      <BookingTable />
    </>
  );
}
