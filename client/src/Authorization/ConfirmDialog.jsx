import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import Request from "@/utility/Request";
import { removeUser, updateUser } from "@/redux/slices/Collaborate";

export default function ConfirmDialog({
  toastMessage,
  triggerBtn,
  title,
  description,
  actionData,
}) {
  const dispatch = useDispatch();

  async function handleAction() {
    if (actionData.action === "Delete") {
      const response = await Request({
        route: "/user/revoke",
        method: "POST",
        body: { userId: actionData.userId, action: "Admin" },
      });

      if (response.success) {
        dispatch(removeUser({id: actionData.userId}));
        toast.success(toastMessage);
      } else {
        toast.error(
          "An error occurred. Please try again! (" + response.message + ")"
        );
      }
    } else if (actionData.action === "Update") {
      const response = await Request({
        route: "/user/change",
        method: "PUT",
        body: { userId: actionData.userId, role: actionData.toRole, action: "Admin" },
      });

      if (response.success) {
        // console.log(response.data/data);
        dispatch(updateUser(response.data.data));
        toast.success(toastMessage);
      } else {
        toast.error(
          "An error occurred. Please try again! (" + response.message + ")"
        );
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full cursor-pointer">
        {triggerBtn}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleAction();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
