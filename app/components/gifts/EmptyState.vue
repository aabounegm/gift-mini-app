<script setup lang="ts">
import balloonsImg from "~/assets/images/ballons.png";
</script>

<template>
  <div
    class="bg-secondary_bg_color rounded-xl h-60 flex flex-col justify-evenly items-center px-6"
  >
    <img :src="balloonsImg" class="size-24" />
    <p class="text-center">{{ $t("gifts.empty.title") }}</p>
    <NuxtLink to="/store">{{ $t("gifts.empty.action") }}</NuxtLink>
  </div>
</template>
