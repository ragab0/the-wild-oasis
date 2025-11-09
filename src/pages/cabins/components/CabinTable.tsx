import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllCabins } from "@/hooks/useCabins";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { DataTablePagination } from "@/components/DataTablePagination";
import { SortButton } from "@/components/SortButton";
import ClearButton from "@/components/ClearButton";
import CabinRow from "./CabinRow";

export default function CabinTable() {
  const { isLoading, data } = useGetAllCabins();

  if (isLoading) return <Spinner size={50} className="mx-auto" />;
  if (!data?.data?.length)
    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-muted-foreground">No cabins found</p>
        <ClearButton />
      </div>
    );

  const pageSize = 10;
  const pageCount = Math.ceil(data.count / pageSize);

  return (
    <div className="space-y-4">
      <Table className="border rounded-xl">
        <TableHeader className="text-center">
          <TableRow className="uppercase [&>*]:font-semibold bg-sidebar">
            <TableHead></TableHead>
            <TableHead>
              <SortButton field="id">Cabin</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="capacity">Capacity</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="price">Price</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="discount">Discount</SortButton>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} />
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center">
        <DataTablePagination pageCount={pageCount} />
      </div>
    </div>
  );
}
