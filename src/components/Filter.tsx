import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { FilterIcon, ChevronDownIcon } from "lucide-react";

export interface FilterConfig {
  key: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  defaultValue?: string;
}

interface FilterProps {
  config: FilterConfig;
  className?: string;
}

const defaultConfigs: Record<string, FilterConfig> = {
  last: {
    key: "last",
    label: "Time Period",
    options: [
      { label: "All time", value: "all" },
      { label: "Last 7 days", value: "7" },
      { label: "Last 30 days", value: "30" },
      { label: "Last 90 days", value: "90" },
    ],
    defaultValue: "all",
  },
  status: {
    key: "status",
    label: "Status",
    options: [
      { label: "All", value: "all" },
      { label: "Checked out", value: "checked-out" },
      { label: "Checked in", value: "checked-in" },
      { label: "Unconfirmed", value: "unconfirmed" },
    ],
    defaultValue: "all",
  },
  discount: {
    key: "discount",
    label: "Discount",
    options: [
      { label: "All", value: "all" },
      { label: "No discount", value: "false" },
      { label: "With discount", value: "true" },
    ],
    defaultValue: "all",
  },
};

export default function Filter({ config, className = "" }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue =
    searchParams.get(config.key) || config.defaultValue || "all";
  const currentOption =
    config.options.find((opt) => opt.value === currentValue) ||
    config.options[0];

  const handleSelect = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === config.defaultValue) {
      newParams.delete(config.key);
    } else {
      newParams.set(config.key, value);
    }

    setSearchParams(newParams);
  };

  const hasActiveFilter = currentValue !== config.defaultValue;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 ${className}`}
        >
          <FilterIcon className="h-4 w-4" />
          <span>{config.label}</span>
          <ChevronDownIcon className="h-4 w-4" />
          {hasActiveFilter && (
            <Badge variant="secondary" className="ml-1 h-5 px-1 text-xs">
              {currentOption.label}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{config.label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {config.options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="flex items-center justify-between"
            >
              <span>{option.label}</span>
              {option.value === currentValue && (
                <div className="h-2 w-2 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Pre-configured filter components
// props: Omit<FilterProps, "config">

export function DateFilter() {
  return <Filter config={defaultConfigs.last} />;
}

export function StatusFilter() {
  return <Filter config={defaultConfigs.status} />;
}

export function DiscountFilter() {
  return <Filter config={defaultConfigs.discount} />;
}
