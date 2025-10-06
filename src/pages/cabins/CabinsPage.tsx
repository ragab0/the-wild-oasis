import { Button } from "@/components/ui/button";
import { useState } from "react";
import CabinTable from "./components/CabinTable";
import CabinForm from "./components/CabinForm";

export default function CabinsPage() {
  const [showForm, setShowForm] = useState(false);

  function handleAdd() {
    setShowForm((show) => !show);
  }

  return (
    <>
      <div className="flex justify-between items-center gap-5">
        <h1>All Cabins</h1>
        <p>Filter / Sort</p>
      </div>
      <div className="flex flex-col gap-5">
        <CabinTable />
        <Button onClick={handleAdd} size={"lg"}>
          {showForm ? "Hide" : "Add new cabin"}
        </Button>
        {showForm && <CabinForm />}
      </div>
    </>
  );
}
