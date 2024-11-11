<script setup lang="ts">
import { useWebApp } from "vue-tg";

definePageMeta({
  middleware(from, to, next) {
    const { initDataUnsafe } = useWebApp();
    const giftId = initDataUnsafe.start_param;

    if (from.path === "/" && giftId) {
      return navigateTo(`/gifts/${giftId}/received`);
    }

    return navigateTo("/store");
  },
});
</script>

<template>
  <div />
</template>
