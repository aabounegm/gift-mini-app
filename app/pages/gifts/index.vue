<script setup lang="ts">
import { useWebApp } from "vue-tg";
import type { Gift } from "~~/shared/types";

const { initDataUnsafe } = useWebApp();

const { data: gifts } = useFetch<Gift[]>(`/api/gifts`, {
  params: { userId: initDataUnsafe.user?.id },
  default: () => [],
});

function startSend(gift: Gift) {
  console.log("Sending gift", gift);
}
</script>

<template>
  <div class="p-4 text-center">
    <header class="my-4 px-4">
      <h1 class="text-2xl font-semibold mb-2">Send Gifts in Telegram</h1>
      <p class="text-lg text-label-secondary font-light">
        Send gifts to users that can be stored in their app profile.
      </p>
    </header>

    <GiftsEmptyState v-if="gifts.length === 0" />
    <main v-else class="grid grid-cols-3 gap-2 mt-4">
      <GiftsGiftCard
        v-for="gift in gifts"
        :key="gift._id"
        :gift="gift"
        @sendClick="startSend(gift)"
      />
    </main>
  </div>
</template>
