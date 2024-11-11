<script setup lang="ts">
import giftIcon from "assets/icons/gift.svg";

const { data: gifts } = useFetch("/api/gifts", {
  default: () => [],
});
</script>

<template>
  <div>
    <header class="text-center px-2 py-6">
      <div
        class="gift-icon bg-button_color mx-auto"
        :style="{ maskImage: `url(${giftIcon})` }"
      />
      <h1 class="text-2xl font-semibold my-2">Buy and send gifts</h1>
      <p>Unique gifts for everyone by Crypto Pay.</p>
    </header>
    <main class="grid grid-cols-2 gap-4 p-4">
      <StoreGiftCard v-for="gift in gifts" :gift />
    </main>
  </div>
</template>

<style scoped>
.gift-icon {
  mask-size: 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-position: center;
  width: 44px;
  height: 48px;
}
</style>
