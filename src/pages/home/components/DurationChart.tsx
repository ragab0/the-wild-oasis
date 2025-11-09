import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Booking } from "@/types/booking";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const chartData = [
  { duration: "1 night", stays: 0, fill: "var(--chart-1)" },
  { duration: "2-3 nights", stays: 0, fill: "var(--chart-2)" },
  { duration: "4-7 nights", stays: 0, fill: "var(--chart-3)" },
  { duration: "8-14 nights", stays: 0, fill: "var(--chart-4)" },
  { duration: "15+ nights", stays: 0, fill: "var(--chart-5)" },
];
const chartConfig = {
  stays: {
    label: "Number of stays",
  },
} satisfies ChartConfig;

interface props {
  bookings: Booking[];
  isLoading: boolean;
}

export default function DurationChart({ bookings, isLoading }: props) {
  const confirmedStays = bookings.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  console.log(confirmedStays);

  confirmedStays.forEach((stay) => {
    const num = Number(stay.total_nights);
    if (num === 1) chartData[0].stays++;
    else if (num === 2 || num === 3) chartData[1].stays++;
    else if (num >= 4 && num <= 7) chartData[2].stays++;
    else if (num >= 8 && num <= 14) chartData[3].stays++;
    else if (num >= 15) chartData[4].stays++;
  });

  if (isLoading) {
    return (
      <Card className="min-h-[300px] flex items-center justify-center">
        <Spinner size={50} className="mx-auto max-w-[50px]" />
      </Card>
    );
  }

  return (
    <Card className="grid grid-cols-2 gap-2">
      <CardHeader className=" col-span-2">
        <CardTitle>Stay Duration Summary</CardTitle>
      </CardHeader>
      <CardContent className=" overflow-auto">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="stays"
              nameKey="duration"
              innerRadius={85}
              outerRadius={110}
              paddingAngle={3}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-2">
          {chartData.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-sm">
                {item.duration} ({item.stays} stays)
              </span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
