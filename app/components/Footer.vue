<script setup lang="ts">
import store from "~/assets/icons/market.svg";
import gift from "~/assets/icons/gift.svg";
import leaderboard from "~/assets/icons/earth.svg";
import profile from "~/assets/icons/profile.svg";

const links = [
  {
    text: "Store",
    to: "/store",
    iconSrc: store,
  },
  {
    text: "Gifts",
    to: "/gifts",
    iconSrc: gift,
  },
  {
    text: "Leaderboard",
    to: "/leaderboard",
    iconSrc: leaderboard,
  },
  {
    text: "Profile",
    to: "/profile",
    iconSrc: profile,
  },
];
</script>

<template>
  <footer class="flex justify-around w-screen fixed bottom-0 py-2">
    <NuxtLink
      v-for="{ iconSrc, text, to } in links"
      :to="to"
      class="footer-link"
    >
      <div class="mx-auto icon" :style="{ maskImage: `url(${iconSrc})` }" />
      <span class="inline-block text-xs my-1">
        {{ text }}
      </span>
    </NuxtLink>
  </footer>
</template>

<style lang="css" scoped>
footer {
  @apply bg-bottom_bar_bg_color;
}
.footer-link {
  @apply text-subtitle_text_color;
}
.footer-link .icon {
  @apply bg-subtitle_text_color;
  mask-size: 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-position: center;
  width: 24px;
  height: 24px;
}
.footer-link.router-link-active span {
  @apply text-link_color;
}
.footer-link.router-link-active .icon {
  @apply bg-link_color;
}
</style>
