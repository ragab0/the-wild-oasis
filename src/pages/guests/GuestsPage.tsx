import { useGetGuests } from "@/hooks/useGuests";
import { Skeleton } from "@/components/ui/skeleton";
import { GuestCard } from "./components/GuestCard";

export default function GuestsPage() {
  const { data, isLoading } = useGetGuests();

  if (isLoading)
    return (
      <>
        <Skeleton className="h-12 w-1/3" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-full" />
          ))}
        </div>
      </>
    );

  return (
    <>
      <h1>Guests (#{data?.length})</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((guest) => (
          <GuestCard key={guest.id} guest={guest} />
        ))}
      </div>
    </>
  );
}
