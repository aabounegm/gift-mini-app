<script setup lang="ts">
import { useWebApp } from "vue-tg";

const { initDataUnsafe } = useWebApp();
const { setLocale, locales } = useI18n();

if (locales.value.includes(initDataUnsafe.user?.language_code)) {
  // @ts-expect-error matching types is not so straightforward
  setLocale(initDataUnsafe.user.language_code);
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url("~/assets/css/main.css");

.page-enter-active,
.page-leave-active {
  transition: transform 0.3s ease;
}

.page-leave-to {
  transform: translateX(-100%);
}

.page-enter-from {
  transform: translateX(100%);
}
</style>
