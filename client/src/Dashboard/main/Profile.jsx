import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck, CircleUser, ContactRound } from "lucide-react";
import React from "react";

export default function Profile() {
  return (
    <div className="flex flex-col md:gap-y-0 gap-y-4 items-center justify-between">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between p-5 pb-3 shadow-sm">
          <CardTitle className="text-base">Your Profile</CardTitle>
          <CircleUser className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="pt-3">
          <ProfileDetails title="Username" value="John Doe" />
          <ProfileDetails
            title="Your Email Address"
            value={
              <p className="flex items-center">
                user@example.com <CircleCheck className="w-4 h-4 ml-1" />
              </p>
            }
          />
          <ProfileDetails title="Your Role | Status" value="Writer | Active" />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between p-5 pb-3 shadow-sm">
          <CardTitle className="text-base">Admin Profile</CardTitle>
          <ContactRound className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="pt-3">
          <ProfileDetails title="Username" value="John Doe" />
          <ProfileDetails title="Request for Role change?" value="Editor" />
        </CardContent>
      </Card>
    </div>
  );
}

const ProfileDetails = ({ title, value }) => {
  return (
    <div className="flex flex-row items-center justify-between mt-2">
      <p className="text-sm text-muted-foreground font-medium">{title}</p>
      <p className="text-sm text-primary font-medium">{value}</p>
    </div>
  );
};
