<script
    setup
    lang="ts"
>

import {clsx} from "clsx";
import {useAttrs} from "vue";

type SurfaceProps = {
  span?: boolean
  component?: string
}

const props = withDefaults(defineProps<SurfaceProps>(), {
  component: 'p'
})

const attrs = useAttrs()

const className = clsx('typography', attrs.class as string | undefined)

const component = props.span ? 'span' : props.component

</script>

<template>
  <component
      :is="component"
      :class="className"
      v-bind="$attrs"
  >
    <slot />
  </component>
</template>
