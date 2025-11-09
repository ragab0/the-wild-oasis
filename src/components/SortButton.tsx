import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface SortButtonProps {
  field: string;
  children: React.ReactNode;
}

export function SortButton({ field, children }: SortButtonProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sortBy") || "created_at";
  const currentDirection = searchParams.get("sortDirection") || "desc";
  const isActive = currentSort === field;

  const handleSort = () => {
    const newParams = new URLSearchParams(searchParams);

    if (isActive) {
      // Toggle direction if already sorting by this field
      newParams.set(
        "sortDirection",
        currentDirection === "asc" ? "desc" : "asc"
      );
    } else {
      // Set new sort field and default to ascending
      newParams.set("sortBy", field);
      newParams.set("sortDirection", "asc");
    }

    setSearchParams(newParams);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSort}
      className="hover:bg-muted/30 -ml-3"
    >
      {children}
      {isActive ? (
        currentDirection === "asc" ? (
          <ArrowUp className="ml-1 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-1 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-1 h-4 w-4" />
      )}
    </Button>
  );
}
