import type { Cabin } from "@/types/cabine";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/utils/helpers";
import { useState } from "react";
import { Copy, Pencil, Trash } from "lucide-react";
import CabinForm from "./CabinForm";

export default function CabinRow({ cabin }: { cabin: Cabin }) {
  const [showForm, setShowForm] = useState(false);
  const isCreating = false;
  const isDeleting = false;
  const {
    // id,
    name,
    // description,
    capacity,
    discount,
    price,
    image,
    // created_at,
    // updated_at,
  } = cabin;

  function duplicateHandler() {}
  function deleteHandler() {}

  return (
    <>
      <TableRow>
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
              disabled={isCreating}
              onClick={duplicateHandler}
            >
              <Copy />
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
            <CabinForm cabinToEdit={cabin} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
