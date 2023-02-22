import Scripts from "../script/Script";
import React from "react";

export type ScriptsPreviewProps = {
  page?: any;
};

export const ScriptsPreview = ({ page }: ScriptsPreviewProps) => {
  if (!page.scripts) return null;
  return (
    <div className="p-10">
      <Scripts scripts={page.scripts} />
    </div>
  );
};
export default React.memo(ScriptsPreview);
