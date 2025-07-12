import "./StrictMode.scss";
import { ReactNode, StrictMode } from "react";

export const withStrictMode = (Component: () => ReactNode) => () => (
	<StrictMode>
		<Component />
	</StrictMode>
);
