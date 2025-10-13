import { Button } from "@/components/ui/button";
import CabinTable from "./components/CabinTable";
import CabinForm from "./components/CabinForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function CabinsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-5">
        <h1>All Cabins</h1>
        <p>Filter / Sort</p>
      </div>
      <div className="flex flex-col gap-5">
        <CabinTable />
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"lg"} className="w-full">
              Add new cabin
            </Button>
          </DialogTrigger>
          <DialogContent className="!max-w-7xl">
            <CabinForm />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
