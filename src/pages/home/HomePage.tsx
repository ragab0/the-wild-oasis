import { useGetBookingsStatsPeriod } from "@/hooks/useBookings";
import { DateFilter } from "@/components/Filter";
import Stats from "./components/Stats";
import TodayActivity from "./components/TodayActivity";
import DurationChart from "./components/DurationChart";
import SalesChart from "./components/SalesChart";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function HomePage() {
  const { data: bookings = [], isPending: isLoading } =
    useGetBookingsStatsPeriod();

  if (isLoading) {
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner size={50} className="mx-auto" />
    </div>;
  }

  return (
    <>
      <div className="flex justify-between items-center gap-5">
        <h1>Dashboard</h1>
        <DateFilter />
      </div>
      <div className="grid grid-cols-4  gap-5">
        <Stats bookings={bookings} isLoading={isLoading} />
        <div className="col-span-2 *:h-full">
          <TodayActivity bookings={bookings} isLoading={isLoading} />
        </div>
        <div className="col-span-2 *:h-full">
          <DurationChart bookings={bookings} isLoading={isLoading} />
        </div>
        <div className="col-span-full *:h-full">
          <SalesChart bookings={bookings} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}
