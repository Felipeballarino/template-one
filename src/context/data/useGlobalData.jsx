import { useContext } from "react";
import { GlobalDataContext } from "./GlobalDataContext";

export const useGlobalData = () => useContext(GlobalDataContext);
