import { createHistoryRouter } from "atomic-router";
import { createRoutesView } from "atomic-router-react";
import { DocumentationPageRoute } from "pages/DocumentationPage";
import { HomePageRoute } from "pages/HomePage";
import { routerControls, routes } from "shared/routing";

export const router = createHistoryRouter({
	base: isGithubPages ? "/harhive" : undefined,
	controls: routerControls,
	routes: [
		{
			path: "/",
			route: routes.homePage,
		},
		{
			path: "/documentation",
			route: routes.documentationPage,
		},
	],
});

export const Pages = createRoutesView({
	routes: [HomePageRoute, DocumentationPageRoute],
});
