<script setup lang="ts">
import type { LeaderboardUser } from "~~/shared/types";
import GiftIcon from "~/assets/icons/gift.svg";

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
          <GiftIcon class="inline-block text-button_color !size-3 !mb-0 mr-1" />
          <span class="align-middle">
            {{
              $t("leaderboard.giftsReceived", {
                count: user.receivedGiftsCount,
              })
            }}
          </span>
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
