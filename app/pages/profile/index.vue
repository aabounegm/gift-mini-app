<script setup>
import { useWebApp } from "vue-tg";

definePageMeta({
  redirect() {
    const { initDataUnsafe } = useWebApp();

    if (!initDataUnsafe.user) {
      // Shouldn't happen
      return "/store";
    }

    return `/profile/${initDataUnsafe.user?.id}`;
  },
});
</script>

<template>
  <div />
</template>
