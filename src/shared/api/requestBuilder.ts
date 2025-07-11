import { variables } from "../config/variables";
import { createRequestBuilder } from "../lib/api/createRequestBuilder";

export const requestBuilder = createRequestBuilder({
	baseUrl: variables.API_URL,
});
