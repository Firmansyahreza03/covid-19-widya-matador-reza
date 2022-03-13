import React, { useState, createContext } from "react";
export const SideContext = createContext();
export const SideProvider = (props) => {
  const [toogleSideBar, setToogleSideBar] = useState(false);
  return (
    <SideContext.Provider value={{ toogleSideBar, setToogleSideBar }}>
      {props.children}
    </SideContext.Provider>
  );
};
