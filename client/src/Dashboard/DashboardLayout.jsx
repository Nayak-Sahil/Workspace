import React from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/utility/Logo";
import workspace from "../assets/workspace.svg";
import collaboration from "../assets/collaboration.svg";
import dashboard from "../assets/dashboard.svg"
import { generalList, workspaceList } from "./sidebarList";

export default function DashboardLayout() {
  const currentRoute = useLocation();
  console.log(currentRoute);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
      <div className="hidden shadow-lg bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo />
            </Link>
          </div>
          <div className="flex-1 mt-3 flex flex-col justify-between">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Sidebar />
            </nav>
            <img
              src={currentRoute.pathname.endsWith("workspace") ? workspace : currentRoute.pathname.endsWith("access-control") ? collaboration : dashboard}
              className="mx-auto mb-5"
              alt="Workspace Environment"
              width={200}
            />
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-col">
        <header className="flex h-14 border-b items-center gap-4 bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] flex flex-col py-4">
              <nav className="grid gap-2 text-[15px] font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold mb-5"
                >
                  <Logo />
                </Link>
                <Sidebar />
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex flex-1 justify-between">
            <p className="font-medium capitalize flex items-center text-sm">
              <ChevronRight className="w-4 h-4 mr-1" />
              {currentRoute.pathname
                .split("/")
                .filter((e) => {
                  return e != "";
                })
                .join(" / ").split("-").join(" ")}
            </p>
            <p className="font-medium capitalize flex items-center text-primary text-sm mr-1">
              {/* <CircleStop className="w-4 h-4 mr-1" /> Active */}
            </p>
          </div>
          <DropdownMenu className="">
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <UserRound className="text-card-foreground h-4 w-4" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>user@domain.com</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="h-screen flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-4 sm:overflow-y-hidden overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const DashboardNav = ({ listData, isMobileNav }) => {
  const path = useLocation();
  const isActive = path.pathname + path.search === listData.link;
  return (
    <NavLink
      to={`${listData.link}`}
      className={() =>
        `flex items-center gap-3 rounded-lg ${
          isMobileNav ? "px-2 py-2 text-sm" : "px-3 py-3"
        }  ${isActive ? "text-primary bg-muted" : "text-muted-foreground"}
          transition-all hover:text-primary`
      }
      end
    >
      {listData.icon}
      {listData.title}
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <div className="overflow-y-auto">
      {generalList.map((list, index) => {
        return <DashboardNav key={index} listData={list} />;
      })}
      <hr className="my-2" />
      <p className="mb-2 mt-5">Manage</p>
      {workspaceList.map((list, index) => {
        return <DashboardNav key={index} listData={list} />;
      })}
    </div>
  );
};
