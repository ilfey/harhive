import {RouterProvider} from "atomic-router-react";
import {ReactNode} from "react";
import {router} from "../../lib/routing";


export const withRouterProvider = (Component: () => ReactNode) =>
  () => (
    <RouterProvider router={router}>
      <Component />
    </RouterProvider>
  )
