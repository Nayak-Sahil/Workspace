import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FileUser,
  MailWarning,
  UserRoundPen,
  UserRoundPlus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Request from "@/utility/Request";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/redux/slices/Collaborate";

export default function AddUserDialog() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const collaborator = useSelector((state) => state.Collaborate);

  async function handleAddUser(e){
    e.preventDefault();

    if(email == "" || role == ""){
      toast.error("All fields are required!");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if(!emailRegex.test(email)){
      toast.error("Oops! That email doesn't seem right. Try again?");
      return;
    }

    //? Send the data to the server
    const response = await Request({body: {email, role, action: "Admin"}, method: "POST", route: "/user/grant"});
    console.log(response);
    if(response.success){
      dispatch(addUser([...collaborator, response.data.data]));
      toast.success("Successfully added user!");
    }else{
      toast.error("An error occurred. Please try again! (" + response.message + ")");
    }
  }

  return (
    <Dialog onOpenChange={() => setRole("")}>
      <DialogTrigger asChild>
        <Button>
          <UserRoundPlus />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary self-start tracking-normal">Invite User</DialogTitle>
          <DialogDescription className="sm:block hidden">
            Add a new user and manage access rights.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full grid gap-4 gap-y-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left" htmlFor="userRole">
              Email
            </Label>
            <Input onChange={(e)=>{setEmail(e.target.value)}} placeholder="user@example.com" className="col-span-3" />
          </div>
          <p className="w-full text-xs mb-2 font-medium text-muted-foreground flex">
            Ensure you provide a valid email, as the system will send invitation to the specified address.
          </p>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-left" htmlFor="userRole">
              Assign Role
            </Label>
            <Select
              className="w-full col-span-3"
              onValueChange={(value) => {
                setRole(value);
              }}
            >
              <SelectTrigger id="userRole">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="w-full mt-1 text-xs font-medium text-primary flex">
            {role == "Editor" ? (
              <>
                <UserRoundPen className="mr-1 h-4 w-4" /> Editor: User can view,
                edit and delete workspace's file.
              </>
            ) : role == "Viewer" ? (
              <>
                <FileUser className="mr-1 h-4 w-4" /> Viewer: User can only view
                workspace's file.
              </>
            ) : (
              ""
            )}
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handleAddUser} className="text-sm sm:mt-0 mt-2 shadow-md" type="submit">
            Send Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
