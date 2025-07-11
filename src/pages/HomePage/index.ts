import { lazy } from "react";
import { routes } from "shared/routing";
import { BaseLayout } from "widgets/BaseLayout";

export const HomePageRoute = {
	route: routes.homePage,
	view: lazy(() => import("./ui/HomePage")),
	layout: BaseLayout.with({
		suspense: true,
	}),
};
