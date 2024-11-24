import { Users, Wifi } from "lucide-react";
import React from "react";
import StatisticsCard from "./StatisticsCard";
import collaborateImg from "../../assets/collaborate.png";
import userSettingImg from "../../assets/management.png";
import LastActivity from "./LastActivity";
import Profile from "./Profile";
import collabWorkspace from "../../assets/collabspace.svg";
import WeeklyActivity from "./WeeklyActivity";

export default function Main() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-2 md:gap-8 md:p-2">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {statisticsData.map((stats, idx) => {
          return (
            <StatisticsCard
              key={idx}
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
    statistics: 5,
    icon: <Users className="dashboard-card-icon" />,
    link: "/dashboard/access-control",
    linkTitle: "Check out",
    image: userSettingImg,
  },
  {
    title: "Active Users",
    statistics: 5,
    icon: <Wifi className="dashboard-card-icon" />,
    link: "/dashboard/workspace",
    linkTitle: "View More",
    image: collaborateImg,
  }
];
