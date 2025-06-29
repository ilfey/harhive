import {createApiQuery} from "../createApiQuery";
import {imagesContract} from "./model";

export type ImagesPayload = {
  page?: number,
  timemark?: number,
}

export const createImagesQuery = () =>
  createApiQuery({
    request: ({page, ...rest}: ImagesPayload) => ({
      url: "/api/",
      method: "GET",
      query: {
        action: 'img-list',
        number: 20,
        row: (page ?? 1) * 20,
        ...rest,
      },
    }),
    response: {
      contract: imagesContract,
    }
  })