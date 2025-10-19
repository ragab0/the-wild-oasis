import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import BookingRow from "./BookingRow";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useGetAllBookings } from "@/hooks/useBookings";
import BookingRow from "./BookingRow";

export default function BookingTable() {
  const { data, isLoading } = useGetAllBookings();
  if (isLoading) return <Spinner size={50} className="mx-auto" />;
  if (!data || !data.length) return "no data";

  return (
    <Table className="border border-gray-200 rounded-xl">
      <TableHeader className="text-center">
        <TableRow className="uppercase [&>*]:font-semibold [&>*]:text-gray-600">
          <TableHead>Cabin</TableHead>
          <TableHead>Guest</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((booking) => (
          <BookingRow key={booking.id} booking={booking} />
        ))}
      </TableBody>
    </Table>
  );
}
