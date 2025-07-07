import {useUnit} from 'effector-react';
import {Masonry, useInfiniteLoader} from "masonic";
import {Image} from "shared/ui/Image";
import {BaseLayout} from 'widgets/BaseLayout';
import {css} from "generated/css";
import {$images, fetchImages} from '../model';

export const HomePage = () => {
  return (
    <BaseLayout>
      <Grid />
    </BaseLayout>
  );
};

const Grid = () => {
  const {
    loadMoreImages,
  } = useUnit({
    loadMoreImages: fetchImages,
  });

  const {
    images,
  } = useUnit({
    images: $images,
  });

  const loadMore = (startIndex: number, stopIndex: number) =>
    loadMoreImages({startIndex, stopIndex,})

  const handleOnRender = useInfiniteLoader(loadMore, {
    minimumBatchSize: 200,
    threshold: 2,
  });

  if (!images.length) {
    return null;
  }

  return (
    <Masonry
      key={crypto.randomUUID()}
      onRender={handleOnRender}
      items={images}
      columnCount={5}
      columnGutter={16}
      columnWidth={172}
      overscanBy={1.5}
      render={({width, data}) => (
        <div
          className={
            css({
              borderRadius: "xl",
              overflow: 'hidden'
            })
          }
          style={{
            width
          }}
        >
          <Image
            className={
              css({
                display: 'block',
                width: "full",
              })
            }
            src={data.mid}
            fallbackSrc={data.high}
          />
        </div>
      )}
    />
  )
}