import "./ErrorBoundary.scss";
import { Component, ErrorInfo, ReactNode } from "react";

export class ErrorBoundary extends Component<{ children: ReactNode }> {
	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("Render error: ", error, info);
	}

	render() {
		return this.props.children;
	}
}
