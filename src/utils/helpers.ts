import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function subtractDates(dateStr1: string, dateStr2: string) {
  return differenceInDays(parseISO(dateStr1), parseISO(dateStr2));
}

export function formatDistanceFromNow(dateStr: string) {
  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");
}
