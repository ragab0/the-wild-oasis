import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function ClearButton() {
  const [searchParams, setSearchParams] = useSearchParams();

  const hasActiveFilters = Array.from(searchParams.entries()).length > 0;

  if (!hasActiveFilters) return null;

  const handleClear = () => {
    setSearchParams({});
  };

  return (
    <Button variant="outline" onClick={handleClear} className="gap-2">
      <XCircle className="h-4 w-4" />
      Clear filters
    </Button>
  );
}
