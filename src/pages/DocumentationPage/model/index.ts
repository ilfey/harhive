import { createEvent, createStore, sample } from "effector";
import { imagesModel } from "models/images";
import { not } from "patronum";
import { ImageItem } from "shared/api/image";
import { atom } from "shared/lib/utils/atom";

export const homePageModel = atom((mounted) => {
	const fetchImages = createEvent<{
		startIndex: number;
		stopIndex: number;
	}>();

	const $images = createStore<ImageItem[]>([]);

	sample({
		clock: fetchImages,
		filter: not(imagesModel.imagesQuery.$pending),
		fn: ({ startIndex, stopIndex }) => ({
			offset: startIndex,
			limit: stopIndex - startIndex,
		}),
		target: imagesModel.fetchWithTimemark,
	});

	sample({
		clock: imagesModel.$images,
		source: $images,
		fn: (pool, page) => [...pool, ...page],
		target: $images,
	});

	sample({
		clock: mounted,
		fn: () => ({
			limit: 100,
			offset: 0,
		}),
		target: imagesModel.imagesQuery.start,
	});

	return {
		fetchImages,

		$images,
	};
});
