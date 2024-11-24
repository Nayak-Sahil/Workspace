import React from "react";
import EditorTool from "./EditorTool";
import Header from "./Header";

export default function Workspace() {
  return (
    <div className="w-full sm:h-full h-[90%] flex flex-col items-center justify-between">
      <Header />
      <EditorTool />
    </div>
  );
}
