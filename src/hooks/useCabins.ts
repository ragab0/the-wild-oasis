import type {
  Cabin,
  CreateCabinFormData,
  UpdateCabinData,
} from "@/types/cabin";
import { cabinsService } from "@/services/cabins.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner"; // or your toast library

/** keys */

export const cabinsKeys = {
  all: ["cabins"] as const,
  single: (id: number) => [...cabinsKeys.all, id] as const,
};

/** queries */

export function useGetAllCabins() {
  const [searchParams] = useSearchParams();
  const discount = searchParams.get("discount") || "all";
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const sortBy = searchParams.get("sortBy") || "created_at";
  const sortDirection = (searchParams.get("sortDirection") || "desc") as "asc" | "desc";

  return useQuery({
    queryKey: [...cabinsKeys.all, { discount, page, pageSize, sortBy, sortDirection }],
    queryFn: () => cabinsService.getAllCabins({ 
      discount, 
      page, 
      pageSize, 
      sortBy, 
      sortDirection 
    }),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useGetCabinById(id: number) {
  return useQuery({
    queryKey: cabinsKeys.single(id),
    queryFn: () => cabinsService.getCabinById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
}

/** mutations */

export function useCreateCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCabinFormData) => cabinsService.createCabin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cabinsKeys.all });
      toast.success("Cabin successfully created");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create cabin");
    },
  });
}

interface Update {
  data: UpdateCabinData;
  id: number;
  hasImagePath: string | null;
}
export function useUpdateCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id, hasImagePath }: Update) =>
      cabinsService.updateCabin(data, id, hasImagePath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cabinsKeys.all });
      toast.success("Cabin successfully updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update cabin");
    },
  });
}

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => cabinsService.deleteCabin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cabinsKeys.all });
      toast.success("Cabin successfully deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete cabin");
    },
  });
}

export function useDuplicateCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cabin: Cabin) => cabinsService.duplicateCabin(cabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cabinsKeys.all });
      toast.success("Cabin successfully duplicated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to duplicate cabin");
    },
  });
}
