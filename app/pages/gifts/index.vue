<script setup lang="ts">
import { useWebApp } from "vue-tg";
import type { Gift } from "~~/shared/types";

const { initDataUnsafe } = useWebApp();

const { data: gifts } = useFetch<Gift[]>(`/api/gifts`, {
  params: { userId: initDataUnsafe.user?.id },
  default: () => [],
});

const giftToSend = ref<Gift>();

// This is not working for some reason

// const { query } = useRoute();
// const unwatch = watch(gifts, (gifts) => {
//   if (gifts.length === 0) {
//     return;
//   }

//   console.log("gifts", gifts.length);
//   console.log("query", query.gift);
//   if (query.gift) {
//     console.log(
//       "setting giftToSend to",
//       gifts.find((gift) => gift._id === query.gift)
//     );
//     giftToSend.value = gifts.find((gift) => gift._id === query.gift);
//   }
//   console.log("unwatchher", unwatch);
//   // unwatch();
// });
</script>

<template>
  <div class="p-4 text-center">
    <header class="my-4 px-4">
      <h1 class="text-2xl font-semibold mb-2">{{ $t("gifts.title") }}</h1>
      <p class="text-lg text-subtitle_text_color font-light">
        {{ $t("gifts.subtitle") }}
      </p>
    </header>

    <GiftsEmptyState v-if="gifts.length === 0" />
    <main v-else class="grid grid-cols-3 gap-2 mt-4">
      <GiftsGiftCard
        v-for="gift in gifts"
        :key="gift._id"
        :gift="gift"
        @sendClick="giftToSend = gift"
      />
    </main>

    <BottomSheet
      @close="giftToSend = undefined"
      :modelValue="giftToSend != undefined"
    >
      <GiftsSendGift v-if="giftToSend" :gift="giftToSend" />
    </BottomSheet>
  </div>
</template>
