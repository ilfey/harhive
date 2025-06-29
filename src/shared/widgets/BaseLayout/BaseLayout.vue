<script
    setup
    lang="ts"
>
import "./BaseLayout.scss"
import {Surface} from "shared/ui/Surface";
import {Text} from "shared/ui/Text";
</script>

<template>
  <div class="base-layout">
    <Surface
        component="header"
        class="header"
    >

    </Surface>
    <Surface class="content">
      <slot />
    </Surface>
    <Surface
        component="footer"
        class="footer"
    >
      <Text span>
        &copy; ilfey
      </Text>
    </Surface>
  </div>
</template>