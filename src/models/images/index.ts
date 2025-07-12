import { createEvent, createStore, sample } from "effector";
import { createImagesQuery, ImageItem } from "shared/api/image";
import { ImagesPayload } from "shared/api/image/requests";
import { atom } from "shared/lib/utils/atom";

export const imagesModel = atom(() => {
	const imagesQuery = createImagesQuery();

	const fetchWithTimemark = createEvent<Omit<ImagesPayload, "timemark">>();

	const $images = createStore<ImageItem[]>([]);
	const $timemark = createStore<number | null>(null);

	sample({
		clock: imagesQuery.finished.success,
		filter: ({ result }) => Boolean(result.at(0)),
		fn: ({ result }) => result[0].entries,
		target: $images,
	});

	sample({
		clock: imagesQuery.finished.success,
		filter: ({ result }) => Boolean(result.at(1)),
		fn: ({ result }) => result[1]!.timemark,
		target: $timemark,
	});

	sample({
		clock: fetchWithTimemark,
		source: $timemark,
		filter: Boolean,
		fn: (timemark, payload) => ({
			timemark,
			...payload,
		}),
		target: imagesQuery.refresh,
	});

	return {
		imagesQuery,

		fetchWithTimemark,

		$images,
	};
});
