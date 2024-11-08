<script setup lang="ts">
import store from "~/assets/icons/market.svg";
import gift from "~/assets/icons/gift.svg";
import leaderboard from "~/assets/icons/earth.svg";
import profile from "~/assets/icons/profile.svg";

const links = [
  {
    text: "Store",
    to: "/",
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
      <div
        :src="iconSrc"
        class="mx-auto icon"
        :style="{ maskImage: `url(${iconSrc})` }"
      />
      <span class="inline-block text-xs my-1">
        {{ text }}
      </span>
    </NuxtLink>
  </footer>
</template>

<style lang="css" scoped>
footer {
  background-color: #f0f0f0;
}
.footer-link {
  color: #959595;
}
.footer-link .icon {
  mask-size: 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-position: center;
  width: 24px;
  height: 24px;
  background-color: #959595;
}
.footer-link.router-link-active {
  color: #3478f6;
}
.footer-link.router-link-active .icon {
  background-color: #3478f6;
}
</style>
