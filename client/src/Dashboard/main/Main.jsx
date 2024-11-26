import { Users, Wifi } from "lucide-react";
import React, { useEffect } from "react";
import StatisticsCard from "./StatisticsCard";
import collaborateImg from "../../assets/collaborate.png";
import userSettingImg from "../../assets/management.png";
import LastActivity from "./LastActivity";
import Profile from "./Profile";
import collabWorkspace from "../../assets/collabspace.svg";
import WeeklyActivity from "./WeeklyActivity";
import { useDispatch, useSelector } from "react-redux";
import Request from "@/utility/Request";
import { addUser } from "@/redux/slices/Collaborate";
import { setAdmin } from "@/redux/slices/AdminProfile";

export default function Main() {
  const dispatch = useDispatch();
  const collaborate = useSelector((state) => state.Collaborate);
  const profile = useSelector((state) => state.Profile["0"]);

  async function fetchUsers() {
    const response = await Request({
      method: "GET",
      route: "/user/get-all",
    });

    if (response.success) {
      let collaborators = response.data;
      
      let AdminProfile = collaborators.find((user) => {return user.role == 'Admin'});
      collaborators = collaborators.filter((user)=>{return user.role != 'Admin'});
      
      dispatch(addUser(collaborators));
      dispatch(setAdmin(AdminProfile));
    } else {
      console.error(response.message);
    }
  }

  useEffect(() => {
    if (collaborate.length === 0) {
      fetchUsers();
    }
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-2 md:gap-8 md:p-2">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {statisticsData.map((stats, idx) => {
          return (
            <StatisticsCard
              key={idx}
              authorizedUsers={collaborate.length}
              activeUsers={collaborate.length - 1}
              title={stats.title}
              statistics={stats.statistics}
              icon={stats.icon}
              index={idx}
              link={stats.link}
              linkTitle={stats.linkTitle}
              image={stats.image}
            />
          );
        })}
        <WeeklyActivity />
        <img className="sm:place-self-start place-self-center sm:my-0 my-4" src={collabWorkspace} alt="Workspace" width={200} />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <LastActivity />
        <Profile />
      </div>
    </main>
  );
}

const statisticsData = [
  {
    title: "Authorized Users",
    icon: <Users className="dashboard-card-icon" />,
    link: "/dashboard/access-control",
    linkTitle: "Check out",
    image: userSettingImg,
  },
  {
    title: "Active Users",
    icon: <Wifi className="dashboard-card-icon" />,
    link: "/dashboard/workspace",
    linkTitle: "View More",
    image: collaborateImg,
  }
];
