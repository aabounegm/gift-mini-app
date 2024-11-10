<script setup lang="ts">
import { useWebAppMainButton, useWebAppBackButton } from "vue-tg";
import type { Gift } from "~~/shared/types";

const { params } = useRoute();
const router = useRouter();

const { data: gift } = useFetch<Gift>(`/api/gift/${params.giftId}`);

const { mainButtonText, onMainButtonClicked, isMainButtonVisible } =
  useWebAppMainButton();

const { onBackButtonClicked, isBackButtonVisible } = useWebAppBackButton();

const {
  isSecondaryButtonVisible,
  secondaryButtonText,
  secondaryButtonPosition,
  onSecondaryButtonClicked,
} = useWebAppSecondaryButton();

onMainButtonClicked(() => router.push("/gifts")); // TODO: go to the specific gift
onSecondaryButtonClicked(() => router.push("/store"));
onBackButtonClicked(() => router.back());

// For some reason, using the secondary button breaks the vue-tg components
// Also, there is some race condition that disables the buttons after enabling
onMounted(() => {
  setTimeout(() => {
    isBackButtonVisible.value = true;

    mainButtonText.value = "Send gift";
    isMainButtonVisible.value = true;

    secondaryButtonText.value = "Go to store";
    secondaryButtonPosition.value = "bottom";
    isSecondaryButtonVisible.value = true;
  }, 100);
});

// I think there is some race condition, where the unMount of the previous page is called *after* the mount of the new page
onBeforeUnmount(() => {
  isMainButtonVisible.value = false;
  isSecondaryButtonVisible.value = false;
  isBackButtonVisible.value = false;
});
</script>

<template>
  <main class="flex justify-center items-center">
    <div class="p-8">
      <img :src="gift?.image" class="mx-auto size-40" />
      <h1 class="text-2xl my-2 font-semibold text-center">Gift purchased</h1>
      <p class="text-center">
        The {{ gift?.name }} gift was purchased for {{ gift?.price }}
        {{ gift?.currency }}
      </p>
    </div>
  </main>
</template>
