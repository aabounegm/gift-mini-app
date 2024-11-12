<script setup lang="ts">
import type { Gift } from "~~/shared/types";
import { compactNumber } from "~~/shared/utils";

defineProps<{ gift: Gift }>();
</script>

<template>
  <NuxtLink
    :to="`/store/${gift._id}`"
    class="grid gap-2 rounded-xl p-3"
    :style="{
      background: `url(/images/telegram-pattern.svg), linear-gradient(${gift.color}33, ${gift.color}1a)`,
    }"
  >
    <p class="text-right opacity-50">
      {{ compactNumber(gift.available) }} of
      {{ compactNumber(gift.totalSupply) }}
    </p>
    <img class="size-28 mx-auto" :src="gift.image" />
    <p class="text-lg font-semibold text-center">{{ gift.name }}</p>
    <button
      class="py-2 px-4 rounded-full mx-auto flex gap-1 justify-center items-center"
    >
      <CurrencyIcon
        :currency="gift.currency"
        class="text-button_text_color !size-5 mr-1"
      />
      <span>{{ gift.price }} {{ gift.currency }}</span>
    </button>
  </NuxtLink>
</template>
