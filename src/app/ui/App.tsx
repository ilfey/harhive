import compose from "compose-function";
import { withErrorBoundary } from "shared/ui/ErrorBoundary";
import { withStrictMode } from "shared/ui/StrictMode";
import { Pages } from "../lib/routing";
import { withRouterProvider } from "./RouterProvider";

const withProviders = compose(
	withStrictMode,
	withErrorBoundary,
	withRouterProvider,
);

export const App = withProviders(() => <Pages />);
