<script setup lang="ts">
import { MainButton, useWebApp, useWebAppPopup } from "vue-tg";
import type { Gift } from "~~/shared/types";

const { initData } = useWebApp();
const { showAlert } = useWebAppPopup();

const router = useRouter();
const { params, query } = useRoute();

const { data: gift } = useFetch<Gift>(`/api/gift/${params.id}`);

onMounted(async () => {
  if (!query.from) {
    // TODO: show an error message
    return;
  }

  try {
    await $fetch(`/api/gift/${params.id}/transfer`, {
      query: {
        from: query.from,
        initData,
      },
    });
  } catch (error) {
    showAlert(`Failed to accept the gift: ${(error as Error).message}`, () => {
      router.replace("/profile");
    });
  }
});
</script>

<template>
  <MainButton
    :text="$t('gifts.received.action')"
    @click="$router.push('/profile')"
  />
  <main class="flex justify-center items-center h-[90vh]">
    <div class="p-8">
      <img :src="gift?.image" class="mx-auto size-40" />
      <h1 class="text-2xl my-2 font-semibold text-center">
        {{ $t("gifts.received.title") }}
      </h1>
      <p class="text-center">
        {{ $t("gifts.received.subtitle", { name: gift?.name }) }}
      </p>
    </div>
  </main>
</template>
