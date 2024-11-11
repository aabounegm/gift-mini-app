<script setup lang="ts">
import type { Gift } from "~~/shared/types";
import balloonsImg from "~/assets/images/ballons.png";

defineProps<{ gift: Gift }>();
</script>

<template>
  <div class="flex flex-col gap-2 justify-center h-full text-center py-4">
    <img :src="balloonsImg" class="balloon size-32 p-4 mx-auto rounded-full" />
    <h1 class="text-lg">Invoice from Gift App</h1>
    <p class="font-bold text-3xl">{{ gift.price }} {{ gift.currency }}</p>
    <p class="text-hint_color">${{ gift.price }}</p>
    <p>Purchasing a {{ gift.name }} gift</p>
  </div>
</template>

<style scoped>
.balloon {
  background: linear-gradient(180deg, #a1d1f2 0%, #a898f4 100%);
}
</style>
