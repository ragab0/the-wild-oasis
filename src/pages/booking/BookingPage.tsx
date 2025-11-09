import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarRange,
  Users,
  Bed,
  CreditCard,
  Coffee,
  ClipboardCheck,
  MapPin,
  Mail,
  UserSquare2,
} from "lucide-react";
import {
  useCheckInBooking,
  useCheckOutBooking,
  useDeleteBooking,
  useGetBookingById,
} from "@/hooks/useBookings";
import BookingSkeleton from "./components/BookingSkeleton";
import { statusColors } from "@/assets/constants";
import BookingNotfound from "./components/BookingNotfound";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: booking, isLoading } = useGetBookingById(Number(id));
  const { mutate: checkIn, isPending: isCheckingIn } = useCheckInBooking();
  const { mutate: checkOut, isPending: isCheckingOut } = useCheckOutBooking();
  const { mutate: deleteBooking, isPending: isDeleting } =
    useDeleteBooking(true);

  const loading = isLoading || isDeleting || isCheckingIn || isCheckingOut;
  if (loading) return <BookingSkeleton />;
  if (!booking) return <BookingNotfound />;

  const {
    created_at,
    start_date: startDate,
    end_date: endDate,
    total_nights: numNights,
    total_guests: numGuests,
    cabin_price: cabinPrice,
    extra_price: extrasPrice,
    total_price: totalPrice,
    has_breakfast: hasBreakfast,
    observations,
    is_paid: isPaid,
    status,
    guests: {
      full_name: guestName,
      email,
      nationality: country,
      country_flag: countryFlag,
      national_id: nationalID,
    },
    cabins: { name: cabinName },
  } = booking;

  const isCheckInReady = status === "unconfirmed";
  const isCheckOutReady = status === "checked-in";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="flex items-center gap-2">
          {isCheckInReady && (
            <Button
              onClick={() => checkIn(booking.id)}
              disabled={isCheckingIn}
              className="gap-2"
            >
              <ClipboardCheck className="h-4 w-4" />
              Check in
            </Button>
          )}
          {isCheckOutReady && (
            <Button
              onClick={() => checkOut(booking.id)}
              disabled={isCheckingOut}
              className="gap-2"
            >
              <ClipboardCheck className="h-4 w-4" />
              Check out
            </Button>
          )}
          {!isCheckOutReady && (
            <Button
              variant="destructive"
              onClick={() => deleteBooking(booking.id)}
              disabled={isDeleting}
            >
              Delete booking
            </Button>
          )}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">
                    Booking #{booking.id}
                  </CardTitle>
                  <Badge className={`capitalize ${statusColors[status]}`}>
                    {status.replace("-", " ")}
                  </Badge>
                </div>
                <CardDescription>
                  Created on {format(new Date(created_at), "PPP")}
                </CardDescription>
              </div>
              {!isPaid && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Not paid
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Guest Information */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <UserSquare2 className="h-5 w-5" />
                Guest Information
              </h3>
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={countryFlag}
                        alt={country}
                        className="h-6 w-8 rounded-sm shadow-sm"
                      />
                      <span className="text-lg font-medium">{guestName}</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {email}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {country}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ClipboardCheck className="h-4 w-4" />
                      National ID: {nationalID}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Stay Details */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Bed className="h-5 w-5" />
                Stay Details
              </h3>
              <Card>
                <CardContent className="grid gap-4 p-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CalendarRange className="h-4 w-4 text-muted-foreground" />
                      Dates
                    </div>
                    <p>
                      {format(new Date(startDate), "MMM d")} -{" "}
                      {format(new Date(endDate), "MMM d, yyyy")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {numNights} {numNights === 1 ? "night" : "nights"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      Guests
                    </div>
                    <p>
                      {numGuests} {numGuests === 1 ? "guest" : "guests"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cabin {cabinName}
                    </p>
                  </div>
                  {hasBreakfast && (
                    <div className="flex items-center gap-2 text-sm sm:col-span-2">
                      <Coffee className="h-4 w-4 text-muted-foreground" />
                      Breakfast included
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        {/* Price Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cabin price</span>
                  <span>${cabinPrice}</span>
                </div>
                {extrasPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Extras</span>
                    <span>${extrasPrice}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-base font-medium">
                  <span>Total amount</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              <div
                className={cn(
                  "rounded-lg border p-3 text-sm",
                  isPaid
                    ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300"
                    : "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-300"
                )}
              >
                {isPaid ? "Amount has been paid" : "Payment pending"}
              </div>
            </CardContent>
          </Card>
          {observations && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{observations}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
