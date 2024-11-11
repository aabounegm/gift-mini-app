<script setup lang="ts">
import balloonsImg from "~/assets/images/ballons.png";
</script>

<template>
  <div
    class="bg-bg-secondary rounded-xl h-60 flex flex-col justify-evenly items-center"
  >
    <img :src="balloonsImg" class="size-24" />
    <p>You don't have any gifts yet.</p>
    <NuxtLink to="/store" class="text-primary">Open store</NuxtLink>
  </div>
</template>
