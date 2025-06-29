import {createEvent, sample} from "effector";
import {imagesModel} from "features/images";
import {appStarted} from "shared/config";

export const nextPageButtonPressed = createEvent()
export const previousPageButtonPressed = createEvent()

sample({
  clock: appStarted,
  fn: () => ({}),
  target: imagesModel.imagesQuery.start,
})

sample({
  clock: nextPageButtonPressed,
  source: imagesModel.pagination.$page,
  fn: (page) => page + 1,
  target: imagesModel.pagination.pageChanged
})

sample({
  clock: previousPageButtonPressed,
  source: imagesModel.pagination.$page,
  filter: (page) => page > 1,
  fn: (page) => page - 1,
  target: imagesModel.pagination.pageChanged
})