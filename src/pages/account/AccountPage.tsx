import PasswordForm from "./components/PasswordForm";
import PersonalInfoForm from "./components/PersonalInfoForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <h1>Account Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
          <CardDescription>
            Update your personal information and avatar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PersonalInfoForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to a new secure one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
