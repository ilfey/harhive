<script
  setup
  lang="ts"
>
import {useUnit} from 'effector-vue/composition';
import {imagesModel} from 'features/images';
import {css} from 'generated/css/css';
import {box} from 'generated/patterns/box';
import {center} from 'generated/patterns/center';
import {ImageItem} from 'shared/api/image';
import {Button} from 'shared/ui/Button';
import {BaseLayout} from 'shared/widgets/BaseLayout';
import {nextPageButtonPressed, previousPageButtonPressed} from '../model';

const {
  onNextPage,
  onPreviousPage,
} = useUnit({
  onNextPage: nextPageButtonPressed,
  onPreviousPage: previousPageButtonPressed,
});

const {
  images,
  page,
} = useUnit({
  images: imagesModel.$images,
  page: imagesModel.pagination.$page,
});

</script>

<template>
  <BaseLayout>
    <masonry-wall
      :items="images as Array<ImageItem>"
      :column-width="200"
      :min-columns="3"
      :max-columns="5"
      :gap="16"
    >
      <template #default="{ item }">
        <img
          :key="item.id"
          :src="item.mid"
          :class="css({
            w: '100%',
            borderRadius: 'xl',
          })"
          draggable="false"
          alt=""
          />
      </template>
    </masonry-wall>

    <div
      :class="center({
        marginBlock: 4,
        gap: 4
      })"
    >
      <Button @click="onPreviousPage">
        Prev
      </Button>

      <span
        :class="box({
          marginBlock: 4,
          w: '2ch',
          textAlign: 'center'
        })"
      >
        {{ page }}
      </span>

      <Button @click="onNextPage">
        Next
      </Button>
    </div>
  </BaseLayout>
</template>