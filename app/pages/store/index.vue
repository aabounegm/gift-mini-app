<script setup lang="ts">
import GiftIcon from "assets/icons/gift.svg";

const { data: gifts } = useFetch("/api/gifts", {
  default: () => [],
});
</script>

<template>
  <div>
    <header class="text-center px-2 py-6">
      <GiftIcon class="text-button_color mx-auto !size-12" />
      <h1 class="text-2xl font-semibold my-2">{{ $t("store.main.title") }}</h1>
      <p>{{ $t("store.main.subtitle") }}</p>
    </header>
    <main class="grid grid-cols-2 gap-4 p-4">
      <StoreGiftCard v-for="gift in gifts" :gift />
    </main>
  </div>
</template>
