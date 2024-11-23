import { Badge } from "@/components/ui/badge";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

export default React.memo(function PasswordInpt({ handleState, style }) {
  const [isVisible, setVisibility] = useState(false);

  return (
    <div className={`${style} relative h-max w-full`}>
      <Input
        onChange={(e) => {
          handleState(e.target.value);
        }}
        id="password"
        type={isVisible ? "text" : "password"}
        required
        autoComplete="current-password"
      />

      <Badge
        onClick={() => {
          setVisibility(!isVisible);
        }}
        variant="outline"
        className="absolute top-[9px] cursor-pointer select-none right-1 border-none w-max"
      >
        {isVisible ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeClosed className="h-4 w-4" />
        )}
      </Badge>
    </div>
  );
});
