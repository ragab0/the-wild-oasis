import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import type { Booking } from "@/types/booking";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

type SalesByDay = {
  label: string;
  totalSales: number;
  extrasSales: number;
  date: Date;
};

function transformBookingsData(
  bookings: Booking[],
  numDays?: number
): SalesByDay[] {
  const days = numDays
    ? eachDayOfInterval({
        start: subDays(new Date(), numDays),
        end: new Date(),
      })
    : eachDayOfInterval({
        start: new Date(
          Math.min(
            ...bookings.map((booking) => new Date(booking.created_at).getTime())
          )
        ),
        end: new Date(),
      });

  const salesByDay = days.map((date) => {
    const dailyBookings = bookings.filter((booking) =>
      isSameDay(date, new Date(booking.created_at))
    );

    const totalSales = dailyBookings.reduce(
      (sum, booking) => sum + booking.total_price,
      0
    );
    const extrasSales = dailyBookings.reduce(
      (sum, booking) => sum + booking.extra_price,
      0
    );

    return {
      label: format(date, "MMM dd"),
      totalSales,
      extrasSales,
      date,
    };
  });

  return salesByDay;
}

interface props {
  bookings: Booking[];
  numDays?: number;
  isLoading: boolean;
}

export default function SalesChart({ bookings, numDays, isLoading }: props) {
  const salesData = transformBookingsData(bookings, numDays);
  const colors = {
    totalSales: { stroke: "var(--chart-1)", fill: "var(--chart-1)" },
    extrasSales: { stroke: "var(--chart-2)", fill: "var(--chart-2)" },
    text: "var(--muted-foreground)",
    background: "var(--background)",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer height={300} width="100%">
          {isLoading ? (
            <Spinner size={50} className="mx-auto max-w-[50px]" />
          ) : (
            <AreaChart data={salesData}>
              <XAxis
                dataKey="label"
                tick={{ fill: colors.text }}
                tickLine={{ stroke: colors.text }}
              />
              <YAxis
                unit="$"
                tick={{ fill: colors.text }}
                tickLine={{ stroke: colors.text }}
              />
              <CartesianGrid strokeDasharray="4" className="dark:opacity-30" />
              <Tooltip contentStyle={{ backgroundColor: colors.background }} />
              <Area
                dataKey="totalSales"
                type="monotone"
                stroke={colors.totalSales.stroke}
                fill={colors.totalSales.fill}
                strokeWidth={2}
                name="Total sales"
                unit="$"
                fillOpacity={0.3}
              />
              <Area
                dataKey="extrasSales"
                type="monotone"
                stroke={colors.extrasSales.stroke}
                fill={colors.extrasSales.fill}
                strokeWidth={2}
                name="Extras sales"
                unit="$"
                fillOpacity={0.3}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
