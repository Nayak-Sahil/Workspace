import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck, CircleUser, ContactRound } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const profile = useSelector((state) => state.Profile['0']);
  const adminProfile = useSelector((state) => state.AdminProfile);

  return (
    <div className="flex flex-col md:gap-y-0 gap-y-4 items-center justify-between">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between p-5 pb-3 shadow-sm">
          <CardTitle className="text-base">Your Profile</CardTitle>
          <CircleUser className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="pt-3">
          <ProfileDetails title="Username" value={profile.username} />
          <ProfileDetails
            title="Your Email Address"
            value={
              <p className="flex items-center">
                {profile.email} <CircleCheck className="w-4 h-4 ml-1" />
              </p>
            }
          />
          <ProfileDetails title="Your Role | Status" value={`${profile.role} | ${profile.status}`} />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between p-5 pb-3 shadow-sm">
          <CardTitle className="text-base">Admin Profile</CardTitle>
          <ContactRound className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="pt-3">
          <ProfileDetails title="Username" value={adminProfile.username} />
          <ProfileDetails title="Admin Email" value={adminProfile.email} />
          {
            profile.role != "Admin" &&
            <ProfileDetails title="Request to admin for role change?" value={profile.role == "Editor" ? "Viewer" : "Editor"} />
          }
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
