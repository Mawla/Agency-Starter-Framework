import { ConfigType } from "../queries/config.query";
import React from "react";

export const SiteContext = React.createContext({
  config: {} as ConfigType,
});
