import type { JSX, RefObject } from "react";

export interface Route {
	RouteName: string;
	El: RefObject<HTMLDivElement | null>;
	Icon?: JSX.Element;
}
