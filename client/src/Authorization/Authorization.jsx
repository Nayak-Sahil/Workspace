import React from "react";
import {
  Diamond,
  Mail,
  MoreHorizontal,
  Settings2,
  Signature,
  Trash2,
  UserRound,
  UserRoundPen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddUserDialog from "./AddUserDialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConfirmDialog from "./ConfirmDialog";
import { Toaster } from "@/components/ui/sonner";

export default function Authorization() {
  return (
    <main className="flex flex-col h-full gap-4 p-2 lg:gap-6">
      <Card
        className="border-none border-gray-50"
        style={{ boxShadow: "0 0 10px rgba(200, 200, 200, 0.4)" }}
      >
        <CardHeader className="flex sm:flex-row sm:items-center flex-col justify-between">
          <div className="sm:mb-0 mb-3">
            <CardTitle className="text-xl tracking-normal leading-8 text-primary">
              User Access
            </CardTitle>
            <CardDescription>
              Manage your member and their account permission here.
            </CardDescription>
          </div>
          <AddUserDialog />
        </CardHeader>
        <hr className="mb-1" />
        <CardContent className="w-full md:h-[370px] h-max overflow-y-scroll">
          <Table>
            <TableHeader className="hidden md:table-header-group">
              <TableRow>
                <TableHead className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" /> Email
                </TableHead>
                <TableHead className="hidden md:table-cell md:px-0">
                  <p className="flex items-center">
                    <Signature className="h-4 w-4 mr-1" /> Username
                  </p>
                </TableHead>
                <TableHead className="hidden md:flex items-center md:px-0">
                  <UserRound className="h-4 w-4 mr-1" />
                  Role
                </TableHead>
                <TableHead className="hidden md:table-cell md:px-0">
                  <p className="flex items-center">
                    <Diamond className="h-4 w-4 mr-1" /> Status
                  </p>
                </TableHead>
                <TableHead className="flex items-center md:px-0">
                  <Settings2 className="h-4 w-4 mr-1" />
                  <span className="">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <PostList />
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-between items-center py-3 border-t">
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-1</strong> members with assigned roles.
          </div>
        </CardFooter>
      </Card>
      <Toaster position="top-center" />
    </main>
  );
}

const PostList = ({
  title,
  status,
  ttlViews,
  ttlComments,
  lastUpdate,
  blogId,
}) => {
  return (
    <TableRow className="h-6 w-full">
      <TableCell className="flex items-center w-[200px] pt-4 sm:px-4 px-0 font-medium truncate">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <p>user@gmail.com</p>
          <p className="block sm:hidden text-xs text-primary">Admin</p>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell p-2">User001</TableCell>
      <TableCell className="hidden md:table-cell p-2">Admin</TableCell>
      <TableCell className="hidden md:table-cell p-2">
        <Badge variant="outline">Invited</Badge>
      </TableCell>
      <TableCell className="p-2 sm:px-4 px-0 sm:text-start text-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-primary">
              Switch To
            </DropdownMenuLabel>
            {/* <ConfirmDialog
              toastMessage={"User role updated successfully!"}
              triggerBtn={
                <p className="text-card-foreground flex w-full items-center pl-2 font-medium text-sm py-1">
                  <FileUser className="mr-2 w-4 h-4" /> Viewer
                </p>
              }
              title={"Are you absolutely sure to change role?"}
              description={
                "This will change the role of selected user and user can edit, delete workspace file."
              }
            /> */}
            <ConfirmDialog
              toastMessage={"User role updated successfully!"}
              triggerBtn={
                <p className="text-card-foreground flex w-full items-center pl-2 font-medium text-sm py-1">
                  <UserRoundPen className="mr-2 w-4 h-4" /> Editor
                </p>
              }
              title={"Are you sure you want to proceed?"}
              description={
                <p>
                  Changing this user's role{" "}
                  <span className="text-primary font-medium">
                    will grant them permissions to edit and delete workspace
                    files
                  </span>
                  .
                </p>
              }
            />
            <hr className="my-1" />
            <ConfirmDialog
              toastMessage={"User role deleted successfully!"}
              triggerBtn={
                <p className="w-full text-red-500 flex items-center pl-2 font-medium text-sm py-1">
                  <Trash2 className="mr-2 w-4 h-4" /> Remove
                </p>
              }
              title={"Are you sure you want to proceed?"}
              description={
                <p>
                  Deleting this user will{" "}
                  <span className="text-primary font-medium">
                    remove their account
                  </span>
                  . Actions performed by the user will remain visible but will
                  be attributed to (deleted user)
                </p>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
