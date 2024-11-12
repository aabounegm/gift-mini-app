<script setup lang="ts">
import { useWebApp } from "vue-tg";

definePageMeta({
  redirect() {
    const { initDataUnsafe } = useWebApp();

    if (initDataUnsafe.start_param) {
      const [giftId, fromUserId] = initDataUnsafe.start_param.split("_");

      return `/gifts/${giftId}/received?from=${fromUserId}`;
    }

    return "/store";
  },
});
</script>

<template>
  <div />
</template>
