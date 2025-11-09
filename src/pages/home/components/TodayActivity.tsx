import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import type { Booking } from "@/types/booking";

function getActivityType(booking: Booking) {
  const today = new Date();
  const startDate = new Date(booking.start_date);
  const endDate = new Date(booking.end_date);
  if (startDate.toDateString() === today.toDateString()) return "Arriving";
  if (endDate.toDateString() === today.toDateString()) return "Departing";
  return "";
}

const statusColors = {
  unconfirmed: "text-success-foreground bg-success/50",
  "checked-in": "text-info-foreground bg-info/50",
  "checked-out": "text-silver-foreground bg-silver/50",
};

interface props {
  bookings: Booking[];
  isLoading: boolean;
}

export default function TodayActivity({ bookings, isLoading }: props) {
  const today = new Date();
  const activities = bookings.filter((booking) => {
    const startDate = new Date(booking.start_date);
    const endDate = new Date(booking.end_date);
    return (
      startDate.toDateString() === today.toDateString() ||
      endDate.toDateString() === today.toDateString()
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          [...new Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full mb-3" />
          ))
        ) : activities.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No activities today
          </p>
        ) : (
          <Table>
            <TableBody>
              {activities.map((booking) => (
                <TableRow key={booking.id} className="*:px-0 *:py-3">
                  <TableCell>
                    <span
                      className={`font-medium text-xs p-2 rounded-2xl ${
                        statusColors[booking.status]
                      }`}
                    >
                      {getActivityType(booking)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      {booking.guests.country_flag ? (
                        <img src={booking.guests.country_flag} width={20} />
                      ) : (
                        "🌍"
                      )}
                      {booking.guests.full_name}
                    </div>
                  </TableCell>
                  <TableCell>{booking.total_nights} nights</TableCell>
                  <TableCell>
                    {booking.status === "unconfirmed" ? (
                      <Link to={`checkin/${booking.id}`}>
                        <Button size="sm" className="w-full">
                          Check In
                        </Button>
                      </Link>
                    ) : booking.status === "checked-in" ? (
                      <Button
                        size="sm"
                        className="w-full"
                        variant={"destructive"}
                      >
                        Check Out
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
