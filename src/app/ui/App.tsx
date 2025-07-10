import compose from "compose-function";
import {Pages} from "../lib/routing";
import {withErrorBoundary} from "./ErrorBoundary";
import {withRouterProvider} from "./RouterProvider";


const withProviders = compose(
  withErrorBoundary,
  withRouterProvider,
)

export const App = withProviders(() => (
  <Pages />
));
