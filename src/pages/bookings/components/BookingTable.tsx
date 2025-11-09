import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import type { Booking } from "@/types/booking";
import BookingRow from "./BookingRow";
import { DataTablePagination } from "@/components/DataTablePagination";
import { SortButton } from "@/components/SortButton";
import ClearButton from "@/components/ClearButton";

interface BookingTableProps {
  bookings: Booking[];
  count: number;
  isLoading: boolean;
}

export default function BookingTable({
  bookings,
  count,
  isLoading,
}: BookingTableProps) {
  if (isLoading) return <Spinner size={50} className="mx-auto" />;
  if (!bookings?.length)
    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-muted-foreground">No bookings found</p>
        <ClearButton />
      </div>
    );

  const pageSize = 10;
  const pageCount = Math.ceil(count / pageSize);

  return (
    <div className="space-y-4">
      <Table className="border rounded-xl">
        <TableHeader className="text-center">
          <TableRow className="uppercase [&>*]:font-semibold bg-sidebar">
            <TableHead>
              <SortButton field="cabin_id">Cabin</SortButton>
            </TableHead>
            <TableHead>Guest</TableHead>
            <TableHead>
              <SortButton field="created_at">Dates</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="status">Status</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="total_price">Amount</SortButton>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center">
        <DataTablePagination pageCount={pageCount} />
      </div>
    </div>
  );
}
