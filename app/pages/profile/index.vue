<script setup>
import sunIcon from "~/assets/icons/sun.svg";
import moonIcon from "~/assets/icons/moon.svg";
import starIcon from "~/assets/icons/star.svg";
import clockIcon from "~/assets/icons/clock.svg";
import optionsEllipsesIcon from "~/assets/icons/options-ellipses.svg";

let mockAvatar = "/images/avatar-mark.png";

const giftItems = ref([
  {
    avatar: mockAvatar,
    giftIcon: "/images/green-star.png",
    name: "Green Star",
  },
  {
    avatar: mockAvatar,
    giftIcon: "/images/cake.png",
    name: "Delicious Cake",
  },
  {
    avatar: mockAvatar,
    giftIcon: "/images/blue-star.png",
    name: "Blue Star",
  },
  {
    avatar: mockAvatar,
    giftIcon: "/images/red-star.png",
    name: "Red Star",
  },
  {
    avatar: mockAvatar,
    giftIcon: "/images/red-star.png",
    name: "Red Star",
  },
  {
    avatar: mockAvatar,
    giftIcon: "/images/cake.png",
    name: "Delicious Cake",
  },
  {
    avatar: mockAvatar,
    giftIcon: "/images/green-star.png",
    name: "Green Star",
  },
  {
    avatar: mockAvatar,
    giftIcon: "/images/cake.png",
    name: "Delicious Cake",
  },
  {
    avatar: mockAvatar,
    giftIcon: "/images/blue-star.png",
    name: "Blue Star",
  },
]);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="px-4 py-3 flex items-center justify-between">
      <button class="text-blue-500 font-medium">Close</button>
      <div class="text-center">
        <h1 class="font-semibold">Gift App</h1>
        <p class="text-xs text-gray-500">mini app</p>
      </div>
      <button class="w-8 h-8 flex items-center justify-center">
        <img :src="optionsEllipsesIcon" />
      </button>
    </header>

    <!-- Theme and Language Toggle -->
    <div class="px-4 flex justify-between">
      <div class="bg-gray-200 rounded-full p-1 flex items-center">
        <button class="p-2 rounded-full bg-white">
          <img :src="sunIcon" />
        </button>
        <button class="p-2 rounded-full">
          <img :src="moonIcon" />
        </button>
      </div>

      <div class="bg-gray-200 rounded-full p-1 flex items-center font-semibold text-sm">
        <button class="px-3 py-1 rounded-full bg-white">EN</button>
        <button class="px-3 py-1 rounded-full">RU</button>
      </div>
    </div>

    <!-- Profile Section -->
    <div class="-mt-6 text-center">
      <div class="relative flex flex-col items-center">
        <img :src="mockAvatar" alt="Profile" class="w-20 h-20 rounded-full object-cover" />
        <span class="-mt-4 bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full border-2">#160</span>
      </div>
      <h2 class="mt-3 text-xl font-semibold flex items-center justify-center gap-1">
        Mark
        <img class="w-5 h-5 text-blue-500 fill-current" :src="starIcon" />
      </h2>
      <p class="text-gray-500">128 gifts received</p>
    </div>

    <!-- Recent Actions -->
    <div class="px-4 mt-6">
      <button class="mx-auto flex items-center text-blue-500 mb-4 font-medium">
        <img class="mr-1" :src="clockIcon" />
        Recent Actions ›
      </button>

      <div class="grid grid-cols-3 gap-3">
        <template v-for="(item, index) in giftItems" :key="index">
          <div class="bg-gray-100 p-3 rounded-xl relative">
            <img :src="item.avatar" alt="User" class="w-6 h-6 rounded-full absolute top-2 left-2" />
            <span class="absolute top-2 right-2 text-xs text-gray-500">1 of 10K</span>
            <div class="flex flex-col items-center justify-center mt-6">
              <img :src="item.giftIcon" alt="Gift" class="w-12 h-12 mb-2" />
              <p class="text-xs text-center font-medium">{{ item.name }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
