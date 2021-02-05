import React from "react";
import Rest from "./rest";

export const RestClient = React.createContext<Rest | null>(null);

const RestProvider = (props: { children?: any; rest: Rest }) => (
  <RestClient.Provider value={props.rest}>{props.children}</RestClient.Provider>
);

export default RestProvider;
