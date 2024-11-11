<script setup lang="ts">
import { useWebApp } from "vue-tg";

definePageMeta({
  redirect() {
    const { initDataUnsafe } = useWebApp();

    if (initDataUnsafe.start_param) {
      const params = new URLSearchParams(
        decodeURIComponent(initDataUnsafe.start_param)
      );
      const giftId = params.get("gift");
      const fromUserId = params.get("from");

      return `/gifts/${giftId}/received?from=${fromUserId}`;
    }

    return "/store";
  },
});
</script>

<template>
  <div />
</template>
