import {createHistoryRouter} from "atomic-router";
import {createRoutesView} from "atomic-router-react";
import {HomePageRoute} from "pages/HomePage";
import {routerControls, routes} from "shared/routing";


export const router = createHistoryRouter({
  base: isGithubPages ? '/harhive/' : undefined,
  controls: routerControls,
  routes: [
    {
      path: '/',
      route: routes.homePage,
    }
  ]
})

export const Pages = createRoutesView({
  routes: [
    HomePageRoute,
  ],
})