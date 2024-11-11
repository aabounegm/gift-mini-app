<script setup lang="ts">
import { useWebApp } from "vue-tg";

definePageMeta({
  middleware(from) {
    const { initDataUnsafe } = useWebApp();

    if (from.path === "/" && initDataUnsafe.start_param) {
      const params = new URLSearchParams(
        decodeURIComponent(initDataUnsafe.start_param)
      );
      const giftId = params.get("gift");
      const fromUserId = params.get("from");

      return navigateTo(`/gifts/${giftId}/received?from=${fromUserId}`);
    }

    return navigateTo("/store");
  },
});
</script>

<template>
  <div />
</template>
