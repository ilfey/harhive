import { lazy } from "react";
import { routes } from "shared/routing";
import { BaseLayout } from "widgets/BaseLayout";

export const DocumentationPageRoute = {
	route: routes.documentationPage,
	view: lazy(() => import("./ui/DocumentationPage")),
	layout: BaseLayout.with({
		suspense: true,
	}),
};
