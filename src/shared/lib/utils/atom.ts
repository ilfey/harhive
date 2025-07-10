import {createEvent, Event} from "effector";

export const atom = <T>(
  factory: (mounted: Event<void>) => T
) => {
  const mounted = createEvent<void>()

  const model = factory(mounted)

  mounted()

  return model
}