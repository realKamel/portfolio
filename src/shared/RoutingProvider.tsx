import { createContext, useContext, useState, type ReactNode } from "react";
import type { Route } from "./Route";

interface IRouting {
  routes: Route[];
  setRoutes: (routes: Route[]) => void;
  findRoute: (routeName: string) => Route | null;
}

const RoutingContext = createContext<IRouting | undefined>(undefined);

export const RoutingProvider = ({
  initialRoutes,
  children,
}: {
  initialRoutes: Route[];
  children: ReactNode;
}) => {
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);

  function findRoute(routeName: string): Route | null {
    const result = routes.find((r) => r.RouteName.toLowerCase() === routeName.toLowerCase());
    return result === undefined ? null : result;
  }

  return (
    <RoutingContext.Provider value={{ routes, setRoutes, findRoute }}>
      {children}
    </RoutingContext.Provider>
  );
};
export const useRouting = (): IRouting => {
  const routing = useContext(RoutingContext);

  if (!routing) {
    throw new Error("useRouting must be used within a RoutingProvider");
  }

  return routing;
};
