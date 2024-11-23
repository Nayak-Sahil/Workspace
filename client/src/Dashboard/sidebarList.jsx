import { Home, UserCog, Container } from "lucide-react";

const generalList = [
  {
    title: "Dashboard",
    icon: <Home className="h-4 w-4" />,
    link: "/dashboard",
  },
  {
    title: "Access Control",
    icon: <UserCog className="h-4 w-4" />,
    link: "/dashboard/access-control",
  },
];

const workspaceList = [
  {
    title: "Manage",
    icon: <Container className="h-4 w-4" />,
    link: "/dashboard/workspace",
  },
];

export { generalList, workspaceList };
