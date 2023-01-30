import { ConfigType } from "../queries/config";
import React from "react";

export const SiteContext = React.createContext({
  config: {} as ConfigType,
});
