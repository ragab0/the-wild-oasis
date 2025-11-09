import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingNotfound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 p-4 text-center">
      <h2 className="text-2xl font-bold text-foreground">Booking Not Found</h2>
      <p className="text-muted-foreground">
        The booking you're looking for doesn't exist or may have been removed.
      </p>
      <Button variant="outline" onClick={() => navigate("..")} className="mt-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  );
}
