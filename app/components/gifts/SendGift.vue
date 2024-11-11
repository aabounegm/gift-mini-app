<script setup lang="ts">
import { MainButton, useWebAppNavigation } from "vue-tg";
import usdtFilled from "~/assets/currencies/usdt-filled.svg";
import tonFilled from "~/assets/currencies/ton-filled.svg";
import ethFilled from "~/assets/currencies/eth-filled.svg";
import type { Gift } from "~~/shared/types";

defineProps<{
  gift: Gift;
}>();

const iconMap = {
  USDT: usdtFilled,
  TON: tonFilled,
  ETH: ethFilled,
};

const { switchInlineQuery } = useWebAppNavigation();
</script>

<template>
  <MainButton
    text="Send gift to contact"
    @click="switchInlineQuery(gift._id, ['users'])"
  />

  <div class="flex flex-col justify-center items-center gap-6">
    <img :src="gift.image" class="size-40" />
    <h2 class="text-2xl font-semibold">Send gift</h2>
    <table class="bg-bg_color rounded-xl w-full text-start">
      <tbody>
        <tr>
          <td>Gift</td>
          <td>{{ gift.name }}</td>
        </tr>
        <tr>
          <td>Date</td>
          <td>{{ new Date().toLocaleString() }}</td>
        </tr>
        <tr>
          <td>Price</td>
          <td>
            <img :src="iconMap[gift.currency]" class="inline mr-1" />
            {{ gift.price }} {{ gift.currency }}
          </td>
        </tr>
        <tr>
          <td>Availability</td>
          <td>{{ gift.available }} of {{ gift.totalSupply }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
td {
  @apply px-4 py-2;
}
td:first-child {
  @apply font-light text-subtitle_text_color;
}
tr:not(:last-child) {
  border-bottom: 0.33px solid theme("colors.section_separator_color");
}
td:not(:last-child) {
  border-right: 0.33px solid theme("colors.section_separator_color");
}
</style>
