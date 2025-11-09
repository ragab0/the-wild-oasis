import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Logo from "@/components/Logo";
import SignupForm from "./components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-10">
        <Logo />
        <h2 className="text-3xl text-center">Create your account</h2>
        <Card>
          <CardContent>
            <SignupForm />
          </CardContent>
          <CardFooter>
            {/* Back to login link */}
            <div className="border-t border-border pt-6 w-full">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="w-full font-medium py-2.5 rounded-xl group"
                  size={"lg"}
                >
                  <ArrowLeft className="ml-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                  Back to login
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
