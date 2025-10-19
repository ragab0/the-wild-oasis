import { Button } from "./ui/button";
import { sampleService } from "@/services/sample.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "./ui/shadcn-io/spinner";

export default function UploadSample() {
  const queryClient = useQueryClient();

  const { mutate: uploadAll, isPending } = useMutation({
    mutationFn: async () => {
      // Bookings need to be deleted FIRST && created LAST
      await sampleService.resetAll();
      await sampleService.createGuests();
      await sampleService.createCabins();
      await sampleService.createBookings();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(); // Invalidate all queries
      toast.success("All sample data uploaded successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to upload sample data");
    },
  });

  return (
    <div className="flex flex-col gap-2 text-center bg-accent px-2 py-4 rounded-[5px]">
      <h3>SAMPLE DATA</h3>
      <Button
        onClick={() => uploadAll()}
        disabled={isPending}
        variant={"outline"}
      >
        {isPending && <Spinner />}
        Upload ALL
      </Button>
    </div>
  );
}
