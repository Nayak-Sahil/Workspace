import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function StatisticsCard({
  title,
  statistics,
  icon,
  index,
  link,
  image,
  linkTitle,
  authorizedUsers,
  activeUsers,
}) {
  return (
    <Card x-chunk={`dashboard-01-chunk-${index}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-2xl font-bold text-gray-600 flex items-center gap-x-2">
          {index == 0 ? authorizedUsers : activeUsers} {icon}
        </div>
        <Link
          to={link}
          className={`text-xs text-primary font-medium mt-2 flex items-center cursor-pointer`}
        >
          {linkTitle} <ArrowUpRight className="w-4 h-4" />
        </Link>
        <img
          className="absolute right-5 bottom-6"
          src={image}
          alt="title"
          width={title == "Authorized Users" ? 45 : 50}
        />
      </CardContent>
    </Card>
  );
}
