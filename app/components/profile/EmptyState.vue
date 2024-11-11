<script setup lang="ts">
import balloonsImg from "~/assets/images/ballons.png";
</script>

<template>
  <div
    class="bg-secondary_bg_color rounded-xl h-60 flex flex-col justify-evenly items-center"
  >
    <img :src="balloonsImg" class="size-24" />
    <p>You can buy a gift to receive a gift in return.</p>
    <NuxtLink to="/store">Open store</NuxtLink>
  </div>
</template>
