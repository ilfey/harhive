import { Link } from "atomic-router-react";
import { clsx } from "clsx";
import { css } from "generated/css";
import { box, hstack, vstack } from "generated/patterns";
import { text } from "generated/recipes";
import { ReactNode, Suspense } from "react";
import "./BaseLayout.scss";
import { routes } from "shared/routing";

const NAVIGATION = [
	{
		to: routes.homePage,
		children: "Главная",
	},
	{
		to: routes.documentationPage,
		children: "Документация",
	},
];

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
			<header className={layoutChild}>
				<nav
					className={hstack({
						h: 16,
						my: "auto",
					})}
				>
					{NAVIGATION.map((props, index) => (
						<Link
							key={index}
							className={clsx(
								css({
									_hover: {
										textDecoration: "underline",
									},
								}),
								text({ color: "accent" }),
							)}
							{...props}
						/>
					))}
				</nav>
			</header>

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
