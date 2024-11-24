import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CloudUpload,
  HardDriveUpload,
  PencilRuler,
  Upload,
  UserPlus,
  UserRoundPlus,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMode } from "@/redux/slices/ModeSlice";

export default function Header() {
  const dispatch = useDispatch();
  function handleModeChange(wantToPreview) {
    if (wantToPreview) {
        dispatch(setMode("Viewer"));
    } else {
        dispatch(setMode("Editor"));
    }
  }

  return (
    <div className="w-full flex sm:flex-row sm:gap-y-0 gap-y-3 flex-col items-center justify-between px-2">
      <div className="flex items-center gap-x-2">
        <h1 className="flex items-center font-medium text-sm sm:text-base">
          <PencilRuler className="mr-2 h-4 w-4" /> Your Ultimate Productivity
          Space
        </h1>
        <Badge className="text-primary ml-" variant="outline">
          Editor
        </Badge>
      </div>

      <div className="flex items-center justify-between gap-x-5">
        <ActionButton
          children={
            <>
              <CloudUpload className="w-4 h-4" />
              Publish
            </>
          }
          variant="default"
        />
        <ActionButton
          children={
            <Link
              className="flex items-center gap-x-[6px]"
              to="/dashboard/access-control"
            >
              <UserRoundPlus className="w-4 h-4" />
              Invite
            </Link>
          }
          variant="outline"
          style="sm:flex hidden"
        />
        <div className="w-full flex items-center space-x-2">
          <Switch
            onCheckedChange={(checked) => {
              handleModeChange(checked);
            }}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode">Preview</Label>
        </div>
      </div>
    </div>
  );
}

const ActionButton = ({ children, variant, style }) => {
  return (
    <Badge
      variant={variant}
      className={`px-3 cursor-pointer py-[3px] hover:shadow-md shadow-sm flex items-center gap-x-[6px] sm:text-sm text-xs ${style}`}
    >
      {children}
    </Badge>
  );
};
