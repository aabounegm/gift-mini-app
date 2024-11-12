<script setup lang="ts">
import type { PopulatedReceivedGift } from "~~/shared/types";
import { compactNumber } from "~~/shared/utils";

defineProps<{
  item: PopulatedReceivedGift;
}>();
</script>

<template>
  <div class="bg-secondary_bg_color p-3 rounded-xl relative">
    <img
      :src="item.sender.profilePicture"
      alt="User"
      class="size-4 rounded-full absolute top-2 left-2"
    />
    <span class="absolute top-2 right-2 text-xs text-hint_color">
      {{ $t("profile.count", { total: compactNumber(item.gift.totalSupply) }) }}
    </span>
    <div class="flex flex-col items-center justify-center mt-5">
      <img :src="item.gift.image" alt="Gift" class="size-20 mb-2" />
      <p class="text-sm text-center font-medium">
        {{ item.gift.name }}
      </p>
    </div>
  </div>
</template>
