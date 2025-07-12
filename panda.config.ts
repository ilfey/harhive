import { defineConfig, defineGlobalStyles, defineRecipe } from "@pandacss/dev";
import browserslist from "browserslist";

const isProduction =
	(process.env.PANDA_ENV ?? process.env.NODE_ENV) === "production";

const rem = (px: number) => `${(1 / 16) * px}rem`;

export default defineConfig({
	globalCss: defineGlobalStyles({
		html: {
			colorScheme: "dark",
		},

		"::selection": {
			backgroundColor: "white",
			color: "black",
		},

		body: {
			fontFamily: "inter",
			backgroundColor: "black",
			color: "neutral.400",
			lineHeight: 1.5,
		},
	}),
	// Whether to use css reset
	preflight: false,
	lightningcss: true,
	browserslist: browserslist(">= 0.25%"),
	polyfill: true,

	// Where to look for your css declarations
	include: ["./src/**/*.{js,jsx,ts,tsx}"],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			recipes: {
				text: defineRecipe({
					className: "text",
					variants: {
						font: {
							serif: { fontFamily: "Inter" },
							mono: { fontFamily: "monospace" },
						},
						color: {
							accent: { color: "white" },
							foreground: { color: "neutral.400" },
						},
						size: {
							h1: {
								lineHeight: 1,
								fontSize: rem(32),
								marginBlock: rem(16),
							},
							h2: {
								lineHeight: 1,
								fontSize: rem(24),
								marginBlock: rem(12),
							},
							h3: {
								lineHeight: 1,
								fontSize: rem(18),
								marginBlock: rem(9),
							},
							md: {
								lineHeight: 1.5,
								fontSize: rem(16),
							},
						},
					},
					defaultVariants: {
						font: "serif",
						color: "foreground",
						size: "md",
					},
				}),
			},
		},
	},

	patterns: {
		extend: {
			descriptionList: {
				transform(props) {
					return {
						"& dt": {
							color: "white",
						},
						"& dd": {
							marginInlineStart: 6,
						},
						...props,
					};
				},
			},
		},
	},

	// The output directory for your css system
	outdir: "./src/generated",

	hash: isProduction,
});
