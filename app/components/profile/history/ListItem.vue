<script setup lang="ts">
import { useWebApp } from "vue-tg";
import type { HistoryItem, HistoryItemTransfer } from "~~/shared/types";
import sendIcon from "~/assets/icons/send.svg";
import receiveIcon from "~/assets/icons/receive.svg";
import buyIcon from "~/assets/icons/buy.svg";

const { item } = defineProps<{
  item: HistoryItem;
}>();

const {
  initDataUnsafe: { user },
} = useWebApp();

const operationType = computed(() => {
  if (item.transactionType === "buy") {
    return "bought";
  } else if (item.sender._id === user?.id) {
    return "sent";
  } else {
    // item.recipient._id === user?.id
    return "received";
  }
});

const iconMap = {
  bought: buyIcon,
  sent: sendIcon,
  received: receiveIcon,
};
</script>

<template>
  <li class="flex gap-3 p-2 items-center">
    <div class="size-10 relative bg-secondary_bg_color rounded-xl">
      <img :src="item.gift.image" class="p-1" />
      <img
        :src="iconMap[operationType]"
        class="absolute bottom-0 -right-1 size-4"
      />
    </div>
    <div class="grow">
      <p class="capitalize text-sm text-hint_color">{{ operationType }}</p>
      <p class="text-lg">{{ item.gift.name }}</p>
    </div>
    <div>
      <p v-if="operationType === 'bought'">
        -{{ item.gift.price }} {{ item.gift.currency }}
      </p>
      <p v-else-if="operationType === 'sent'">
        to
        <span class="text-link_color">
          {{ (item as HistoryItemTransfer).recipient.name }}
        </span>
      </p>
      <p v-else>
        from
        <span class="text-link_color">
          {{ item.sender.name }}
        </span>
      </p>
    </div>
  </li>
</template>
