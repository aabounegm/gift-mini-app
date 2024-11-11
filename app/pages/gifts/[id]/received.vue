<script setup lang="ts">
import { MainButton } from "vue-tg";
import type { Gift } from "~~/shared/types";

const { params } = useRoute();
const { data: gift } = useFetch<Gift>(`/api/gift/${params.id}`);
</script>

<template>
  <MainButton text="Open profile" @click="$router.push('/profile')" />
  <main class="flex justify-center items-center h-[90vh]">
    <div class="p-8">
      <img :src="gift?.image" class="mx-auto size-40" />
      <h1 class="text-2xl my-2 font-semibold text-center">Gift received</h1>
      <p class="text-center">You have received the gift {{ gift?.name }}.</p>
    </div>
  </main>
</template>
