import { createApiQuery } from "../createApiQuery";
import { imagesContract } from "./model";

export type ImagesPayload = {
	offset: number;
	limit: number;
	timemark?: number;
};

export const createImagesQuery = () =>
	createApiQuery({
		request: ({ limit, offset, ...rest }: ImagesPayload) => ({
			url: "/api/",
			method: "GET",
			query: {
				action: "img-list",
				number: limit,
				row: offset,
				...rest,
			},
		}),
		response: {
			contract: imagesContract,
		},
	});
