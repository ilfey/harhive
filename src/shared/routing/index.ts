import { createRoute, createRouterControls } from "atomic-router";

export const routerControls = createRouterControls();

export const routes = {
	homePage: createRoute(),
	documentationPage: createRoute(),
};
