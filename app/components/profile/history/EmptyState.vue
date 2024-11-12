<script setup lang="ts">
import { MainButton } from "vue-tg";
import balloonsImg from "~/assets/images/ballons.png";
</script>

<template>
  <MainButton text="Open store" @click="$router.push('/store')" />
  <main class="flex justify-center items-center h-[90vh]">
    <div class="p-8">
      <img :src="balloonsImg" class="mx-auto size-40" />
      <h1 class="text-2xl my-2 font-semibold text-center">History is empty</h1>
      <p class="text-center">
        Give and receive gifts so there's something here.
      </p>
    </div>
  </main>
</template>
