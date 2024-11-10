<script setup lang="ts">
import type { Transaction, User } from "~~/shared/types";
import sendIcon from "~/assets/icons/send.svg";
import buyIcon from "~/assets/icons/buy.svg";

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
      <img
        :src="isTransfer ? sendIcon : buyIcon"
        class="absolute bottom-0 right-0"
      />
    </div>
    <div class="flex flex-col">
      <span class="text-sm text-label-secondary font-light">
        {{ isTransfer ? "Send gift" : "Buy gift" }}
      </span>
      <span>
        <span class="text-primary">
          {{ transaction.sender.name }}
        </span>
        <span v-if="isTransfer">
          sent gift to
          <span class="text-primary">{{ transaction.recipient.name }}</span>
        </span>
        <span v-else> bought gift</span>
      </span>
    </div>
  </li>
</template>
