<script
  setup
  lang="ts"
>
import {box} from 'generated/patterns/box';
import {vstack} from 'generated/patterns/vstack';

const layoutChild = box({
  maxW: 1440,
  marginInline: 'auto',
});
</script>

<template>
  <div
    :class="vstack({
    alignItems: 'center',
  })"
  >
    <header
      :class="layoutChild"
    >

    </header>
    <main :class="layoutChild">
      <slot />
    </main>
    <footer :class="layoutChild">
      <span>
        &copy; ilfey
      </span>
    </footer>
  </div>
</template>