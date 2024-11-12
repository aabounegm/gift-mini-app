<script setup lang="ts">
import { MainButton } from "vue-tg";
import balloonsImg from "~/assets/images/ballons.png";
</script>

<template>
  <MainButton
    :text="$t('history.empty.action')"
    @click="$router.push('/store')"
  />
  <main class="flex justify-center items-center h-[90vh]">
    <div class="p-8">
      <img :src="balloonsImg" class="mx-auto size-40" />
      <h1 class="text-2xl my-2 font-semibold text-center">
        {{ $t("history.empty.title") }}
      </h1>
      <p class="text-center">{{ $t("history.empty.subtitle") }}</p>
    </div>
  </main>
</template>
