import { createContext } from "react";
import type { Route } from "./Route";

export const RoutingContext = createContext<Route[]>([]);
