import { useContext } from "react";
import { FloatingNav, type NavItem } from "./ui/floating-navbar";
import { RoutingContext } from "../shared/RoutingContext";
export function NavBar() {
  const routes = useContext(RoutingContext);
  const items: NavItem[] = routes.map((r) => {
    return {
      RouteName: r.RouteName,
      Icon: r.Icon,
      OnClick: () => {
        r.El.current?.scrollIntoView({
          behavior: "smooth",
        });
      },
    };
  });
  return (
    <div className="relative w-full">
      <FloatingNav _navItems={items} />
    </div>
  );
}
