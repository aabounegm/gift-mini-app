<script setup lang="ts">
import { useWebAppMainButton } from "vue-tg";

const { isMainButtonVisible } = useWebAppMainButton();
</script>

<template>
  <div>
    <main :class="{ 'mb-20': !isMainButtonVisible }">
      <slot />
    </main>
    <Footer v-if="!isMainButtonVisible" />
  </div>
</template>
