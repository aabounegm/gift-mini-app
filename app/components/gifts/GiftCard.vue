<script setup lang="ts">
import type { Gift } from "~~/shared/types";

defineProps<{
  gift: Gift;
}>();

defineEmits<{
  sendClick: [];
}>();
</script>

<template>
  <div
    class="bg-bg-secondary rounded-xl gap-2 flex flex-col justify-evenly items-center px-2 py-2"
  >
    <p class="text-label-secondary font-light text-sm">{{ gift.name }}</p>
    <img :src="gift.image" class="size-20" />
    <button
      class="bg-primary text-white rounded-2xl w-10/12 py-1"
      @click="$emit('sendClick')"
    >
      Send
    </button>
  </div>
</template>
