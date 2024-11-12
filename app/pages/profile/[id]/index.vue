<script setup lang="ts">
import { useWebApp } from "vue-tg";
import type { PopulatedReceivedGift, PopulatedUser } from "~~/shared/types";
import ClockIcon from "~/assets/icons/clock.svg";

const { initData, initDataUnsafe } = useWebApp();
const { params } = useRoute();

const { data: user } = useFetch<PopulatedUser>(`/api/users/${params.id}`, {
  query: {
    initData,
  },
});

const selectedItem = ref<PopulatedReceivedGift>();
</script>

<template>
  <div class="min-h-screen p-4" v-if="user">
    <header class="flex items-start">
      <!-- <div>Theme selector</div> -->
      <div class="grow text-center">
        <div class="relative flex flex-col items-center">
          <img
            :src="user?.profilePicture"
            class="size-24 rounded-full object-cover"
          />
          <!-- <span
            class="-mt-4 bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full border-2"
          >
            #160
          </span> -->
        </div>
        <h2
          class="mt-3 text-xl font-semibold flex items-center justify-center gap-1"
        >
          {{ user.name }}
        </h2>
        <p class="text-subtitle_text_color">
          {{ $t("profile.received", { count: user.receivedGifts.length }) }}
        </p>
      </div>
      <!-- <div>Language selector</div> -->
    </header>

    <NuxtLink
      v-if="user._id === initDataUnsafe.user?.id"
      :to="`/profile/${user._id}/history`"
      class="mx-auto my-4 text-lg flex items-center justify-center gap-1"
    >
      <ClockIcon class="mr-1 inline-block !size-4 !mb-0 text-link_color" />
      {{ $t("profile.recent") }} &rsaquo;
    </NuxtLink>

    <div class="mt-6">
      <ProfileEmptyState v-if="user.receivedGifts.length === 0" />

      <div v-else class="grid grid-cols-3 gap-2">
        <ProfileGiftCard
          v-for="item in user.receivedGifts"
          :key="item._id"
          :item="item"
          class="cursor-pointer"
          @click="selectedItem = item"
        />
      </div>
    </div>

    <BottomSheet
      :model-value="selectedItem != undefined"
      @close="selectedItem = undefined"
    >
      <ProfileGiftDetails
        v-if="selectedItem"
        :item="selectedItem"
        @close="selectedItem = undefined"
      />
    </BottomSheet>
  </div>
</template>
