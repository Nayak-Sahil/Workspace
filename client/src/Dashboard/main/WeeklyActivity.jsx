import React from "react";
import { Bar, BarChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "2024-07-15", edit: 450, view: 300 },
  { date: "2024-07-16", edit: 380, view: 420 },
  { date: "2024-07-17", edit: 520, view: 120 },
  { date: "2024-07-18", edit: 140, view: 550 },
  { date: "2024-07-19", edit: 600, view: 350 },
  { date: "2024-07-20", edit: 480, view: 400 },
];

const chartConfig = {
  activities: {
    label: "Activities",
  },
  edit: {
    label: "Edit",
    color: "#2f2e41",
  },
  view: {
    label: "View",
    color: "#009688",
  },
};

export default function WeeklyActivity() {
  return (
    <Card>
      <CardContent className="p-0 sm:py-0 py-5 h-full flex items-center justify-center">
        <ChartContainer className="sm:w-48 w-[235px]" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                });
              }}
            />
            <Bar
              dataKey="edit"
              stackId="a"
              fill="var(--color-edit)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="view"
              stackId="a"
              fill="var(--color-view)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent labelKey="activities" indicator="line" />
              }
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
