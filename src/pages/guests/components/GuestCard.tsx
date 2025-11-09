import type { Guest } from "@/types/guest";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { format } from "date-fns";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

interface UserCardProps {
  guest: Guest;
}

export function GuestCard({ guest }: UserCardProps) {
  const { email, full_name, created_at, country_flag: avatar_url } = guest;

  return (
    <Card className="hover:bg-accent/50 transition-colors">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatar_url} alt={full_name} />
          <AvatarFallback>{full_name[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3 className="font-semibold leading-none">{full_name}</h3>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Role:</span> Guest
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Joined:</span>{" "}
          {format(new Date(created_at), "MMM d, yyyy")}
        </div>
      </CardContent>
    </Card>
  );
}
