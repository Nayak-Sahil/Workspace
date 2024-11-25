import React from "react";
import { ArrowUpRight, Bell, MailCheck, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LastActivity() {
  return (
    <Card x-chunk={`dashboard-01-chunk-1`}>
      <CardHeader className="flex flex-row items-center justify-between p-5 pb-3 shadow-sm">
        <div className="grid gap-1">
          <CardTitle className="text-base leading-4">Last Activity</CardTitle>
          <CardDescription className="font-medium sm:text-sm text-[13px]">
            Recent activities done by users.
          </CardDescription>
        </div>
        <Bell className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="h-[300px] border-rose-400 overflow-y-scroll p-5 pt-0">
        <Table>
          <TableBody>
            <TransactionList date="2024-sep-20" />
            <TransactionList date="2024-sep-20" />
            <TransactionList date="2024-sep-20" />
            <TransactionList date="2024-sep-20" />
            <TransactionList date="2024-sep-20" />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

const TransactionList = ({ user, text, date }) => {
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="px-0">
        <div className="font-medium w-[250px] truncate flex flex-col">
          <p className="text-card-foreground font-normal">
            Just accepted the notification
          </p>
          <div className="flex items-center justify-between text-xs">
            <p className="flex items-center text-primary">
              by user@example.com
            </p>
            <p className="md:hidden block">({date})</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell text-right px-0">{date}</TableCell>
    </TableRow>
  );
};