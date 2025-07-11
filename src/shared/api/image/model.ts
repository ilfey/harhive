import {
	arr,
	num,
	obj,
	or,
	str,
	tuple,
	UnContract,
	val,
} from "@withease/contracts";

export const imageItemContract = obj({
	id: num,
	low: str,
	mid: str,
	high: str,
});

export type ImageItem = UnContract<typeof imageItemContract>;

export const imagesContract = tuple(
	obj({
		entries: arr(imageItemContract),
	}),
	or(
		obj({
			timemark: num,
		}),
		val(null),
	),
);
