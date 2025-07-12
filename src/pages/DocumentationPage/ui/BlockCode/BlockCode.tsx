import "./BlockCode.scss";
import { clsx } from "clsx";
import { box, float } from "generated/patterns";
import { text } from "generated/recipes";
import { Copy } from "lucide-react";
import { ComponentProps } from "react";

type BlockCodeProps = ComponentProps<"pre"> & {
	children: string;
};

export const BlockCode = ({
	className,
	children,
	...props
}: BlockCodeProps) => {
	const handleOnCopy = () => {
		navigator.clipboard.writeText(children);
	};

	return (
		<pre
			className={clsx(
				box({
					pos: "relative",
					p: 2,
					bgColor: "neutral.800",
					borderRadius: "lg",
					border: "1px solid",
					borderColor: "white/20",
					color: "neutral.200",
					fontFamily: "monospace",
					overflowX: "auto",
					w: "100%",
				}),
				text({ size: "md" }),
				className,
			)}
			{...props}
		>
			<code>{children}</code>

			<button
				onClick={handleOnCopy}
				className={float({
					placement: "top-end",
					offset: "5",

					w: 8,
					h: 8,
					cursor: "pointer",
					borderRadius: "md",
					bgColor: "neutral.700",
					_hover: {
						bgColor: "neutral.700/80",
					},
				})}
			>
				<Copy
					className={box({
						aspectRatio: 1,
						w: 4,
					})}
				/>
			</button>
		</pre>
	);
};
