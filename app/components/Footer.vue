<script setup lang="ts">
import StoreIcon from "~/assets/icons/market.svg";
import GiftIcon from "~/assets/icons/gift.svg";
import LeaderboardIcon from "~/assets/icons/earth.svg";
import ProfileIcon from "~/assets/icons/profile.svg";

const links = [
  {
    text: "Store",
    to: "/store",
    icon: StoreIcon,
  },
  {
    text: "Gifts",
    to: "/gifts",
    icon: GiftIcon,
  },
  {
    text: "Leaderboard",
    to: "/leaderboard",
    icon: LeaderboardIcon,
  },
  {
    text: "Profile",
    to: "/profile",
    icon: ProfileIcon,
  },
];
</script>

<template>
  <footer
    class="flex justify-around w-screen fixed bottom-0 py-2 bg-bottom_bar_bg_color"
  >
    <NuxtLink
      v-for="{ icon, text, to } in links"
      :to="to"
      class="footer-link text-subtitle_text_color"
      :class="{
        'router-link-active': $route.path.startsWith(to),
      }"
    >
      <component
        :is="icon"
        class="icon !size-6 text-subtitle_text_color mx-auto"
      />
      <span class="inline-block text-xs my-1">
        {{ text }}
      </span>
    </NuxtLink>
  </footer>
</template>

<style lang="css" scoped>
.footer-link.router-link-active span,
.footer-link.router-link-active .icon {
  @apply text-link_color;
}
</style>
