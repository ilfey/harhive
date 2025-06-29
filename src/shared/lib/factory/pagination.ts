import {createEvent, createStore, Effect, sample} from "effector";

export const createPagination = (isValid?: Effect<number, boolean, void>) => {
  const $page = createStore(1)

  const pageChanged = createEvent<number>()

  if (isValid) {
    const $providedPage = createStore(1)

    sample({
      clock: pageChanged,
      target: [isValid, $providedPage]
    })

    sample({
      clock: isValid.done,
      source: $providedPage,
      filter: Boolean,
      target: $page,
    })
  } else {
    sample({
      clock: pageChanged,
      filter: (newPage) => newPage > 0,
      target: $page,
    })
  }

  return {
    pageChanged,

    $page,
  }
}