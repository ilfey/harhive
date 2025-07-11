import { ReactNode } from "react";
import { ErrorBoundary } from "shared/ui/ErrorBoundary";

export const withErrorBoundary = (Component: () => ReactNode) => () => (
	<ErrorBoundary>
		<Component />
	</ErrorBoundary>
);
