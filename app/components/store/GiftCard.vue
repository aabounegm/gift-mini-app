<script setup lang="ts">
import type { Gift } from "~~/shared/types";
import { compactNumber } from "~~/shared/utils";
import usdtEmpty from "~/assets/currencies/usdt-empty.svg";
import tonEmpty from "~/assets/currencies/ton-empty.svg";
import ethEmpty from "~/assets/currencies/eth-empty.svg";
import tgPattern from "~/assets/background/telegram-pattern.svg";

defineProps<{ gift: Gift }>();

const iconMap = {
  USDT: usdtEmpty,
  TON: tonEmpty,
  ETH: ethEmpty,
};
</script>

<template>
  <NuxtLink
    :to="`/store/${gift._id}`"
    class="grid gap-2 rounded-xl p-3"
    :style="{
      background: `url(${tgPattern}), linear-gradient(${gift.color}33, ${gift.color}1a)`,
    }"
  >
    <p class="text-right opacity-50">
      {{ compactNumber(gift.available) }} of
      {{ compactNumber(gift.totalSupply) }}
    </p>
    <img class="size-28 mx-auto" :src="gift.image" />
    <p class="text-lg font-semibold text-center">{{ gift.name }}</p>
    <button
      class="bg-primary py-2 px-4 rounded-full text-white mx-auto flex gap-1 justify-center items-center"
    >
      <span
        class="currency-icon bg-white size-6"
        :style="{ maskImage: `url(${iconMap[gift.currency]})` }"
      />
      <span>{{ gift.price }} {{ gift.currency }}</span>
    </button>
  </NuxtLink>
</template>

<style lang="css" scoped>
.currency-icon {
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-position: center;
}
</style>
