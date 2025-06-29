<script
    setup
    lang="ts"
>

import {clsx} from "clsx";
import {computed, useAttrs} from "vue";

type SurfaceProps = {
  component?: string
}

withDefaults(defineProps<SurfaceProps>(), {
  component: 'div'
})

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()

const componentAttrs = computed(() => {
  const {class: providedClass, ...rest} = attrs

  const className = clsx('surface', providedClass as string | undefined)

  return {
    class: className,
    ...rest,
  }
})

</script>

<template>
  <component
      :is="component"
      v-bind="componentAttrs"
  >
    <slot />
  </component>
</template>
