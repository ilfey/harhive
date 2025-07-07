import {createEvent, createStore, sample} from "effector";
import {imagesModel} from "features/images";
import {debug, not} from "patronum";
import {ImageItem} from "shared/api/image";
import {appStarted} from "shared/config";


export const fetchImages = createEvent<{
  startIndex: number;
  stopIndex: number;
}>()

export const $images = createStore<ImageItem[]>([])

sample({
  clock: fetchImages,
  filter: not(imagesModel.imagesQuery.$pending),
  fn: ({startIndex, stopIndex}) => ({
    offset: startIndex,
    limit: stopIndex - startIndex,
  }),
  target: imagesModel.fetchWithTimemark
})

debug(imagesModel.fetchWithTimemark)

sample({
  clock: imagesModel.$images,
  source: $images,
  fn: (pool, page) => [...pool, ...page],
  target: $images
})

sample({
  clock: appStarted,
  fn: () => ({
    limit: 100,
    offset: 0,
  }),
  target: imagesModel.imagesQuery.start,
})