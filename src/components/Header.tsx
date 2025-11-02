import { useLogout, useUser } from "@/hooks/useAuth";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2, LogOut, User2 } from "lucide-react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  const navigate = useNavigate();
  const { data } = useUser();
  const { avatar, full_name = "" } = data?.user?.user_metadata || {};
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="flex justify-end items-center py-2 px-[3%] gap-4">
      {/* avatar */}
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center border uppercase">
          <AvatarImage src={avatar} alt={`Avatar of ${full_name}`} />
          <AvatarFallback>
            {(full_name as string).split(" ")[0][0]}
          </AvatarFallback>
        </Avatar>
        <span>{(full_name as string).split(" ")[0]}</span>
      </div>
      {/* menu */}
      <nav>
        <ul className="flex gap-1">
          <li>
            <Button onClick={() => navigate("/account")} variant="ghost">
              <User2 className="text-primary" />
            </Button>
          </li>
          <li>
            <ModeToggle />
          </li>
          <li>
            <Button
              disabled={isPending}
              onClick={() => logout()}
              variant="ghost"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <LogOut className="text-primary" />
              )}
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
