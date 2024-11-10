<script setup lang="ts">
import { MainButton, BackButton } from "vue-tg";
import type { Gift } from "~~/shared/types";
import { compactNumber } from "~~/shared/utils";
import usdtFilled from "~/assets/currencies/usdt-filled.svg";
import tonFilled from "~/assets/currencies/ton-filled.svg";
import ethFilled from "~/assets/currencies/eth-filled.svg";
import tgPattern from "~/assets/background/telegram-pattern.svg";
import type { RecentTransaction } from "~/components/store/TransactionItem.vue";

const { params } = useRoute();
const { data: gift } = useFetch<Gift>(`/api/gift/${params.giftId}`);
const { data: recentActions } = useFetch<RecentTransaction[]>(
  `/api/transactions`,
  {
    params: {
      gift: params.giftId,
    },
    default: () => [],
  }
);

const iconMap = {
  USDT: usdtFilled,
  TON: tonFilled,
  ETH: ethFilled,
};
</script>

<template>
  <BackButton @click="$router.back()" />
  <MainButton text="Buy gift" @click="" />

  <header
    v-if="gift"
    class="m-4 p-10 rounded-xl"
    :style="{
      background: `url(${tgPattern}), linear-gradient(${gift.color}33, ${gift.color}1a)`,
    }"
  >
    <img :src="gift.image" />
  </header>

  <main v-if="gift" class="m-4">
    <h1 class="text-2xl font-semibold">
      <span>{{ gift.name }}</span>
      <span
        class="text-primary text-sm align-middle ml-3 bg-primary bg-opacity-15 py-1 px-2 rounded-full"
      >
        {{ compactNumber(gift.available) }} of
        {{ compactNumber(gift.totalSupply) }}
      </span>
    </h1>
    <p class="text-label-secondary my-2">
      Purchase this gift for the opportunity to give it to another user.
    </p>
    <span>
      <img class="size-5 mr-2 inline-block" :src="iconMap[gift.currency]" />
      <span class="align-middle">{{ gift.price }} {{ gift.currency }}</span>
    </span>
  </main>

  <hr class="h-3 bg-bg-secondary" />

  <footer class="m-4" v-if="recentActions.length > 0">
    <h1 class="text-label-date mb-2">Recent actions</h1>
    <ul>
      <StoreTransactionItem
        v-for="transaction in recentActions"
        :transaction="transaction"
        :key="transaction._id"
      />
    </ul>
  </footer>
</template>
