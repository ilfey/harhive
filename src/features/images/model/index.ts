import {createStore, sample} from "effector";
import {createImagesQuery, ImageItem} from "shared/api/image";
import {createPagination} from "shared/lib/factory/pagination";
import {atom} from "shared/lib/utils/atom";

export const imagesModel = atom(() => {
  const imagesQuery = createImagesQuery()

  const pagination = createPagination()

  const $images = createStore<ImageItem[]>([])
  const $timemark = createStore<number | null>(null)

  sample({
    clock: imagesQuery.finished.success,
    filter: ({result}) => Boolean(result.at(0)),
    fn: ({result}) => result[0].entries,
    target: $images
  })

  sample({
    clock: imagesQuery.finished.success,
    filter: ({result}) => Boolean(result.at(1)),
    fn: ({result}) => result[1]!.timemark,
    target: $timemark,
  })

  sample({
    clock: pagination.$page,
    source: $timemark,
    filter: Boolean,
    fn: (timemark, page) => ({
      timemark,
      page,
    }),
    target: imagesQuery.refresh,
  })

  return {
    imagesQuery,
    pagination,

    $images,
  }
})