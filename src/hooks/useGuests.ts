import { useQuery } from "@tanstack/react-query";
import { guestsService } from "../services/guests.service";
import type { Guest } from "@/types/guest";

export const guestsKeys = {
  all: ["guests"] as const,
  single: (id: number) => [...guestsKeys.all, id] as const,
};

export function useGetGuests() {
  return useQuery<Guest[]>({
    queryKey: guestsKeys.all,
    queryFn: () => guestsService.getAllGuests(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
