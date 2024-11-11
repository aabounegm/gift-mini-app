<script setup lang="ts">
import type { LeaderboardUser } from "~~/shared/types";
import giftIcon from "~/assets/icons/gift.svg";

defineProps<{
  user: LeaderboardUser;
  position: number;
}>();
</script>

<template>
  <li>
    <NuxtLink :to="`/profile/${user._id}`" class="flex items-center gap-3 p-2">
      <img :src="user.profilePicture" class="size-10 rounded-full" />
      <div class="flex-grow">
        <p class="text-lg">{{ user.name }}</p>
        <p class="text-button_color text-sm">
          <span
            :style="{ maskImage: `url(${giftIcon})`, maskSize: '100%' }"
            class="inline-block bg-button_color size-3 mr-1"
          />
          {{ user.receivedGiftsCount }} gifts
        </p>
      </div>
      <span class="text-xl" v-if="position === 1">🥇</span>
      <span class="text-xl" v-else-if="position === 2">🥈</span>
      <span class="text-xl" v-else-if="position === 3">🥉</span>
      <span class="text-md text-subtitle_text_color" v-else>
        #{{ position }}
      </span>
    </NuxtLink>
  </li>
</template>
