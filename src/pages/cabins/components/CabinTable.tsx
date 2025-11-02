import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllCabins } from "@/hooks/useCabins";
import CabinRow from "./CabinRow";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function CabinTable() {
  const { isLoading, data } = useGetAllCabins();
  console.log(data);

  if (isLoading) return <Spinner size={50} className="mx-auto" />;
  if (!data || !data.length) return "no data";

  return (
    <Table className="border rounded-xl">
      <TableHeader className="text-center">
        <TableRow className="uppercase [&>*]:font-semibold bg-sidebar">
          <TableHead></TableHead>
          <TableHead>Cabin</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((cabin) => (
          <CabinRow key={cabin.id} cabin={cabin} />
        ))}
      </TableBody>
    </Table>
  );
}
