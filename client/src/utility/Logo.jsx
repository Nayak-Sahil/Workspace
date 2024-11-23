import { Container } from "lucide-react";
import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Container className="h-[18px] w-[18px] mr-2 text-primary" />
      <p className="font-medium">
        Workspace
      </p>
    </div>
  );
}
