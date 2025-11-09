import { Skeleton } from "@/components/ui/skeleton";
import type { Booking } from "@/types/booking";
import { formatCurrency } from "@/utils/helpers";
import { Briefcase } from "lucide-react";

interface props {
  bookings: Booking[];
  isLoading: boolean;
}

export default function Stats({ bookings, isLoading }: props) {
  const sales = bookings.reduce((acc, curr) => acc + curr.total_price, 0);
  const confirmedStays = bookings.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  const stats = [
    {
      title: "bookings",
      value: bookings.length,
      Ico: (
        <span className="p-3 rounded-full bg-info text-info-foreground">
          <Briefcase size={25} />
        </span>
      ),
    },
    {
      title: "sales",
      value: formatCurrency(sales),
      Ico: (
        <span className="p-3 rounded-full bg-success text-success-foreground">
          <Briefcase size={25} />
        </span>
      ),
    },
    {
      title: "check ins",
      value: confirmedStays.length,
      Ico: (
        <span className="p-3 rounded-full bg-error text-error-foreground">
          <Briefcase size={25} />
        </span>
      ),
    },
    {
      title: "occupancy rate",
      value: "25%",
      Ico: (
        <span className="p-3 rounded-full bg-warning text-warning-foreground">
          <Briefcase size={25} />
        </span>
      ),
    },
  ];

  return stats.map(({ Ico, title, value }, i) => (
    <div
      key={i}
      className="flex items-center gap-4 p-3 bg-card border rounded-lg"
    >
      {Ico}
      <div className="flex flex-col w-full">
        <span className="text-xs uppercase font-semibold opacity-70">
          {title}
        </span>
        <span className="block w-full flex-1 text-2xl font-medium">
          {isLoading ? <Skeleton className="h-5 w-full mt-2" /> : value}
        </span>
      </div>
    </div>
  ));
}
