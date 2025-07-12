import { box, vstack } from "generated/patterns";
import { ReactNode, Suspense } from "react";
import "./BaseLayout.scss";

type BaseLayoutProps = {
	children?: ReactNode;
};

export const BaseLayout = ({ children }: BaseLayoutProps) => {
	return (
		<div
			className={vstack({
				alignItems: "center",
			})}
		>
			<header className={layoutChild}></header>

			<main className={layoutChild}>{children}</main>

			<footer className={layoutChild}></footer>
		</div>
	);
};

const layoutChild = box({
	maxW: 1440,
	w: "100%",
	mx: "auto",
	px: 4,
});

type BaseLayoutWithArgs = {
	props?: BaseLayoutProps;
	suspense?: boolean;
};

BaseLayout.with =
	(args: BaseLayoutWithArgs) =>
	({ children }: BaseLayoutProps) => {
		return (
			<BaseLayout>
				{args.suspense ? (
					<Suspense fallback={null}>{children}</Suspense>
				) : (
					children
				)}
			</BaseLayout>
		);
	};
