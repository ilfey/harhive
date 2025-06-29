<script
    setup
    lang="ts"
>
import "./HomePage.scss"
import {useUnit} from "effector-vue/composition";
import {imagesModel} from "features/images";
import {Surface} from "shared/ui/Surface";
import {Text} from "shared/ui/Text";
import {BaseLayout} from "shared/widgets/BaseLayout";
import {nextPageButtonPressed, previousPageButtonPressed} from "../model";

const {
  onNextPage,
  onPreviousPage,
} = useUnit({
  onNextPage: nextPageButtonPressed,
  onPreviousPage: previousPageButtonPressed,
})

const {
  images,
  page
} = useUnit({
  images: imagesModel.$images,
  page: imagesModel.pagination.$page,
})

</script>

<template>
  <BaseLayout class="home-page">
    <Surface class="images-container">
      <img
          v-for="image of images"
          :key="image.id"
          :src="image.mid"
          class="image"
          draggable="false"
          alt=""
      >
    </Surface>

    <div class="pagination">
      <button @click="onPreviousPage">
        Prev
      </button>

      <Text span>
        {{ page }}
      </Text>

      <button @click="onNextPage">
        Next
      </button>
    </div>
  </BaseLayout>
</template>