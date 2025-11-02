import type { Booking } from "@/types/booking";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import {
  useCheckInBooking,
  useCheckOutBooking,
  useDeleteBooking,
} from "@/hooks/useBookings";
import { format, isToday } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  MoreVerticalIcon,
  SquareArrowDown,
  SquareArrowUp,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusColors = {
  unconfirmed: "text-info-foreground bg-info/50",
  "checked-in": "text-success-foreground bg-success/50",
  "checked-out": "text-silver-foreground bg-silver/50",
};

export default function BookingRow({ booking }: { booking: Booking }) {
  const navigate = useNavigate();
  const { mutate: deleteBooking, isPending: isDeleting } = useDeleteBooking();
  const { mutate: checkInBooking, isPending: isCheckingIn } =
    useCheckInBooking();
  const { mutate: checkOutBooking, isPending: isCheckingOut } =
    useCheckOutBooking();
  const {
    id,
    start_date,
    end_date,
    total_price,
    total_nights,
    status,
    guests: { full_name, email },
    cabins: { name },
  } = booking;

  if (isDeleting) {
    return (
      <TableRow className="animate-pulse px-1 py-2">
        <TableCell colSpan={6} className="h-20"></TableCell>
      </TableRow>
    );
  }

  const isLoading = isDeleting || isCheckingIn || isCheckingOut;

  return (
    <>
      <TableRow
        className={
          isLoading ? "animate-pulse pointer-events-none opacity-70" : ""
        }
      >
        <TableCell className="sono font-semibold capitalize">{name}</TableCell>
        <TableCell>
          <div className="flex flex-col gap-1">
            <span className="font-semibold capitalize">{full_name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">
              {isToday(new Date(start_date))
                ? "Today"
                : formatDistanceFromNow(start_date)}{" "}
              &rarr; {total_nights} night stay
            </span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(start_date), "MMM dd yyyy")} &mdash;{" "}
              {format(new Date(end_date), "MMM dd yyyy")}
            </span>
          </div>
        </TableCell>
        <TableCell>
          <span
            className={`font-semibold uppercase text-xs ${statusColors[status]} px-3 py-1 rounded-full`}
          >
            {status.replace("-", " ")}
          </span>
        </TableCell>
        <TableCell className="font-semibold sono">
          {formatCurrency(total_price)}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVerticalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => navigate(`/bookings/${id}`)}>
                <Eye /> See details
              </DropdownMenuItem>
              {status === "unconfirmed" && (
                <DropdownMenuItem onSelect={() => checkInBooking(id)}>
                  <SquareArrowDown /> Check in
                </DropdownMenuItem>
              )}
              {status === "checked-in" && (
                <DropdownMenuItem onSelect={() => checkOutBooking(id)}>
                  <SquareArrowUp /> Check out
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onSelect={() => deleteBooking(id)}>
                <Trash2 /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
