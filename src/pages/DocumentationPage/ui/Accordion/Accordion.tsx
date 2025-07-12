import "./Accordion.scss";
import { clsx } from "clsx";
import { css } from "generated/css";
import { box, flex } from "generated/patterns";
import { text } from "generated/recipes";
import { ChevronDown } from "lucide-react";
import { ComponentProps, createContext, useContext, useId } from "react";

type AccordionProps = ComponentProps<"div"> & {
	allowMultipleExpanded?: boolean;
};

const AccordionContext = createContext<{ name?: string }>({});

const useAccordionContext = () => useContext(AccordionContext);

export const Accordion = ({
	allowMultipleExpanded,
	className,
	...props
}: AccordionProps) => {
	const name = useId();

	const value = {
		name: allowMultipleExpanded ? undefined : name,
	};

	return (
		<AccordionContext value={value}>
			<div className={clsx(css({}), className)} {...props} />
		</AccordionContext>
	);
};

type AccordionItemProps = ComponentProps<"details"> & {
	open?: boolean;
	summary?: string;
};

export const AccordionItem = ({
	open = false,
	summary,
	children,
	className,
	...props
}: AccordionItemProps) => {
	const { name } = useAccordionContext();

	return (
		<details
			name={name}
			open={open}
			className={clsx(
				css({
					"&:not(:last-child)": {
						borderBottom: "1px",
						borderBottomStyle: "solid",
						borderBottomColor: "white/20",
					},
				}),
				className,
			)}
			{...props}
		>
			<summary
				className={clsx(
					flex({
						minH: 10,
						paddingBlock: 2,
						alignItems: "center",
						justifyContent: "space-between",
						listStyle: "none",

						"&::marker, &::-webkit-details-marker": {
							display: "none",
							content: "none",
						},

						_hover: {
							textDecoration: "underline",
							cursor: "pointer",
						},
					}),
					text({ color: "accent" }),
				)}
			>
				{summary}

				<ChevronDown
					className={box({
						w: 4,
						aspectRatio: 1,
						flex: "0 0 auto",

						"details[open] &": {
							rotate: "180deg",
						},
					})}
				/>
			</summary>

			<div
				className={css({
					paddingBlockEnd: 4,
				})}
			>
				{children}
			</div>
		</details>
	);
};
