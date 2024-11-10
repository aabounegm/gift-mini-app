<script setup lang="ts">
import type { Gift } from "~~/shared/types";
import ballonsImg from "~/assets/images/ballons.png";

defineProps<{ gift: Gift }>();
</script>

<template>
  <div class="flex flex-col gap-2 justify-center h-full text-center py-4">
    <img :src="ballonsImg" class="size-32 mx-auto rounded-full" />
    <h1 class="text-lg">Invoice from Gift App</h1>
    <p class="font-bold text-3xl">{{ gift.price }} {{ gift.currency }}</p>
    <p class="text-label-secondary">${{ gift.price }}</p>
    <p>Purchasing a {{ gift.name }} gift</p>
  </div>
</template>
