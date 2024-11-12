<script setup lang="ts">
import { MainButton, BackButton, useWebApp } from "vue-tg";
import type { Gift } from "~~/shared/types";
import { compactNumber } from "~~/shared/utils";
import type { RecentTransaction } from "~/components/store/TransactionItem.vue";

const { initData } = useWebApp();
const router = useRouter();
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

const buyingConfirm = ref(false);
const loading = ref(false);

async function buyGift() {
  loading.value = true;
  try {
    await $fetch(`/api/gift/${gift.value?._id}/buy`, {
      params: {
        initData,
      },
    });
  } catch (error) {
    alert("An error occurred: " + error);
    return;
  } finally {
    loading.value = false;
  }
  router.push(`/store/${gift.value?._id}/purchased`);
}
</script>

<template>
  <div>
    <BackButton @click="$router.back()" />
    <MainButton
      v-if="buyingConfirm"
      :text="
        $t('store.gift.pay', {
          amount: gift?.price,
          currency: gift?.currency,
        })
      "
      :progress="loading"
      :disabled="loading"
      @click="buyGift"
    />
    <MainButton
      v-else
      :text="$t('store.gift.buy')"
      @click="buyingConfirm = true"
    />

    <BottomSheet v-model="buyingConfirm">
      <StoreGiftInvoice v-if="gift" :gift="gift" />
    </BottomSheet>

    <header
      v-if="gift"
      class="m-4 p-10 rounded-xl"
      :style="{
        background: `url(/images/telegram-pattern.svg), linear-gradient(${gift.color}33, ${gift.color}1a)`,
      }"
    >
      <img :src="gift.image" />
    </header>

    <main v-if="gift" class="m-4">
      <h1 class="text-2xl font-semibold">
        <span>{{ gift.name }}</span>
        <span
          class="supply-chip relative text-button_color text-sm align-middle ml-3 py-1 px-2 rounded-full"
        >
          {{
            $t("store.gift.amount", {
              remaining: compactNumber(gift.available),
              total: compactNumber(gift.totalSupply),
            })
          }}
        </span>
      </h1>
      <p class="text-subtitle_text_color my-2">
        {{ $t("store.gift.subtitle") }}
      </p>
      <span>
        <CurrencyIcon
          :currency="gift.currency"
          filled
          class="!size-5 mr-2 inline-block"
        />
        <span class="align-middle">{{ gift.price }} {{ gift.currency }}</span>
      </span>
    </main>

    <hr class="h-3 bg-secondary_bg_color border-bg_color" />

    <footer class="m-4" v-if="recentActions.length > 0">
      <h1 class="text-section_header_text_color mb-2">
        {{ $t("store.gift.recent.title") }}
      </h1>
      <ul>
        <StoreTransactionItem
          v-for="transaction in recentActions"
          :transaction="transaction"
          :key="transaction._id"
        />
      </ul>
    </footer>
  </div>
</template>

<style scoped>
.supply-chip::before {
  @apply bg-button_color;
  @apply top-0 left-0 bottom-0 right-0;
  @apply absolute;
  @apply rounded-full;

  content: "";
  opacity: 0.15;
}
</style>
