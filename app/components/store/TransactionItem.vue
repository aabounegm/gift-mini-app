<script setup lang="ts">
import type { Transaction, User } from "~~/shared/types";
import SendIcon from "~/assets/icons/send.svg";
import BuyIcon from "~/assets/icons/buy.svg";

export type RecentTransaction = Transaction & {
  sender: Pick<User, "name" | "profilePicture" | "_id">;
  recipient: Pick<User, "name" | "profilePicture" | "_id">;
};

const { transaction } = defineProps<{
  transaction: RecentTransaction;
}>();

const isTransfer = computed(() => transaction.transactionType === "transfer");
</script>

<template>
  <li class="flex gap-2 items-center my-1">
    <div class="relative">
      <img
        class="size-10 rounded-full mr-1"
        :src="transaction.sender.profilePicture"
      />
      <SendIcon v-if="isTransfer" filled class="absolute bottom-0 right-0" />
      <BuyIcon v-else filled class="absolute bottom-0 right-0" />
    </div>
    <div class="flex flex-col">
      <span class="text-sm text-subtitle_text_color font-light">
        {{ $t(`store.gift.recent.${isTransfer ? "send" : "buy"}`) }}
      </span>
      <span>
        <span class="text-link_color">
          {{ transaction.sender.name }}&nbsp;
        </span>
        <span v-if="isTransfer">
          {{ $t("store.gift.recent.sentTo") }}
          <span class="text-link_color">{{ transaction.recipient.name }}</span>
        </span>
        <span v-else>{{ $t("store.gift.recent.bought") }}</span>
      </span>
    </div>
  </li>
</template>
