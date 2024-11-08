<script setup lang="ts">
import { useWebAppMainButton } from "vue-tg";

const { isMainButtonVisible } = useWebAppMainButton();
</script>

<template>
  <main :class="{ 'mb-20': !isMainButtonVisible }">
    <slot />
  </main>
  <Footer v-if="!isMainButtonVisible" />
</template>
