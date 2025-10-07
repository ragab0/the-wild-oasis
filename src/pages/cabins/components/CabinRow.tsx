import type { Cabin } from "@/types/cabin";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/utils/helpers";
import { useState } from "react";
import { Copy, Pencil, Trash } from "lucide-react";
import CabinForm from "./CabinForm";
import { useDeleteCabin, useDuplicateCabin } from "@/hooks/useCabins";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function CabinRow({ cabin }: { cabin: Cabin }) {
  const { mutate: deleteCabin, isPending: isDeleting } = useDeleteCabin();
  const { mutate: duplicateCabin, isPending: isDupliating } =
    useDuplicateCabin();
  const [showForm, setShowForm] = useState(false);
  const { name, capacity, discount, price, image } = cabin;

  function duplicateHandler() {
    duplicateCabin(cabin);
  }

  function deleteHandler() {
    deleteCabin(cabin.id);
  }

  if (isDeleting) {
    return (
      <TableRow className="animate-pulse px-1 py-2">
        <TableCell colSpan={6} className="h-20 bg-gray-200"></TableCell>
      </TableRow>
    );
  }

  const isLoading = isDeleting || isDupliating;

  return (
    <>
      <TableRow
        className={
          isLoading ? "animate-pulse pointer-events-none opacity-70" : ""
        }
      >
        <TableCell className="font-medium p-1">
          {image && (
            <img
              src={image}
              className="w-full max-w-[100px] aspect-square object-cover"
            />
          )}
        </TableCell>
        <TableCell className="font-semibold sono capitalize text-gray-600">
          {name}
        </TableCell>
        <TableCell className=" text-gray-600">
          Fits up to {capacity} guests
        </TableCell>
        <TableCell className=" font-semibold sono">
          {formatCurrency(price)}
        </TableCell>
        <TableCell className=" font-medium sono text-green-700">
          {discount ? formatCurrency(discount) : <span>&mdash;</span>}
        </TableCell>
        <TableCell>
          <div>
            <Button
              variant="ghost"
              disabled={isDupliating}
              onClick={duplicateHandler}
            >
              {isDupliating ? <Spinner /> : <Copy />}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowForm((show) => !show)}
            >
              <Pencil />
            </Button>
            <Button
              variant="ghost"
              onClick={deleteHandler}
              disabled={isDeleting}
            >
              <Trash color="red" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {showForm && (
        <TableRow className="flex-1 w-full">
          <TableCell width={"100%"} colSpan={6}>
            <CabinForm
              cabinToEdit={cabin}
              hideEditForm={() => setShowForm(false)}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
