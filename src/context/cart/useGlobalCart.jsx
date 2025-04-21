import { useContext } from "react";
import { GlobalCartContext } from "./GlobalCartContext";

export const useGlobalCart = () => useContext(GlobalCartContext);
