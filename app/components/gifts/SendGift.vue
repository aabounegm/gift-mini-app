<script setup lang="ts">
import { MainButton, useWebAppNavigation } from "vue-tg";
import type { Gift } from "~~/shared/types";

defineProps<{
  gift: Gift;
}>();

const { switchInlineQuery } = useWebAppNavigation();
</script>

<template>
  <MainButton
    :text="$t('gifts.sendConfirmation.action')"
    @click="switchInlineQuery(gift._id, ['users'])"
  />

  <div class="flex flex-col justify-center items-center gap-6">
    <img :src="gift.image" class="size-40" />
    <h2 class="text-2xl font-semibold">
      {{ $t("gifts.sendConfirmation.title") }}
    </h2>
    <table class="bg-secondary_bg_color rounded-xl w-full text-start">
      <tbody>
        <tr>
          <td>{{ $t("gifts.sendConfirmation.gift") }}</td>
          <td>{{ gift.name }}</td>
        </tr>
        <tr>
          <td>{{ $t("gifts.sendConfirmation.date") }}</td>
          <td>{{ new Date().toLocaleString() }}</td>
        </tr>
        <tr>
          <td>{{ $t("gifts.sendConfirmation.price") }}</td>
          <td>
            <CurrencyIcon
              :currency="gift.currency"
              filled
              class="inline mr-1"
            />
            {{ gift.price }} {{ gift.currency }}
          </td>
        </tr>
        <tr>
          <td>{{ $t("gifts.sendConfirmation.availability") }}</td>
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
  border-bottom: 1px solid theme("colors.section_separator_color");
}
td:not(:last-child) {
  border-right: 1px solid theme("colors.section_separator_color");
}
</style>
