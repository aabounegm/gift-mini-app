<script setup lang="ts">
import { MainButton } from "vue-tg";
import type { PopulatedReceivedGift } from "~~/shared/types";

defineProps<{
  item: PopulatedReceivedGift;
}>();

defineEmits<{
  close: [];
}>();
</script>

<template>
  <MainButton :text="$t('profile.details.close')" @click="$emit('close')" />

  <div class="flex flex-col justify-center items-center gap-6">
    <img :src="item.gift.image" class="size-40" />
    <h2 class="text-2xl font-semibold">{{ $t("profile.details.title") }}</h2>
    <!-- TODO: fix code duplication -->
    <table class="bg-secondary_bg_color rounded-xl w-full text-start">
      <tbody>
        <tr>
          <td>{{ $t("profile.details.from") }}</td>
          <td class="flex items-center gap-2">
            <img
              :src="item.sender.profilePicture"
              class="size-5 rounded-full"
            />
            <span class="text-link_color">{{ item.sender.name }}</span>
          </td>
        </tr>
        <tr>
          <td>{{ $t("profile.details.date") }}</td>
          <td>{{ item.receiveDate.toLocaleString() }}</td>
        </tr>
        <tr>
          <td>{{ $t("profile.details.price") }}</td>
          <td class="flex items-center gap-2">
            <CurrencyIcon :currency="item.gift.currency" filled />
            <span> {{ item.gift.price }} {{ item.gift.currency }} </span>
          </td>
        </tr>
        <tr>
          <td>{{ $t("profile.details.availability") }}</td>
          <td>
            {{
              $t("profile.details.amount", {
                available: item.gift.available,
                total: item.gift.totalSupply,
              })
            }}
          </td>
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
  border-bottom: 1px solid theme("colors.section_separator_color");
}
td:not(:last-child) {
  border-right: 1px solid theme("colors.section_separator_color");
}
</style>
