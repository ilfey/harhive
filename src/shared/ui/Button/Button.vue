<script
  setup
  lang="ts"
>

import {box} from 'generated/patterns/box';
</script>

<template>
  <button
    :class="box({
      bgColor: 'violet.500',
      _hover: {
        bgColor: 'violet.600'
      },
      cursor: 'pointer',
      h: 10,
      paddingInline: 4,
      color: 'white',
      borderRadius: 'md'
    })"
  >
    <slot />
  </button>
</template>

<style scoped>

</style>