import { useUnit } from "effector-react";
import { css } from "generated/css";
import { Masonry, useInfiniteLoader } from "masonic";
import { useWindowSize } from "shared/lib/hooks/useWindowSize";
import { Image } from "shared/ui/Image";
import { homePageModel } from "../../model";

export const Grid = () => {
	const { loadMoreImages } = useUnit({
		loadMoreImages: homePageModel.fetchImages,
	});

	const { images } = useUnit({
		images: homePageModel.$images,
	});

	const loadMore = (startIndex: number, stopIndex: number) =>
		loadMoreImages({ startIndex, stopIndex });

	const handleOnRender = useInfiniteLoader(loadMore, {
		minimumBatchSize: 200,
		threshold: 2,
	});

	const { width } = useWindowSize();

	let columnsCount = 5;

	if (width < 1024) {
		columnsCount = 4;

		if (width < 768) {
			columnsCount = 3;
		}
	}

	if (!images.length) {
		return null;
	}

	return (
		<Masonry
			key={crypto.randomUUID()}
			onRender={handleOnRender}
			items={images}
			itemKey={(image, index) => `card-${image.id}-${index}`}
			columnCount={columnsCount}
			columnGutter={16}
			columnWidth={172}
			overscanBy={1.5}
			render={({ width, data }) => (
				<div
					className={css({
						borderRadius: "xl",
						overflow: "hidden",
					})}
					style={{
						width,
					}}
				>
					<Image
						className={css({
							display: "block",
							width: "full",
						})}
						src={data.mid}
						fallbackSrc={data.high}
					/>
				</div>
			)}
		/>
	);
};
