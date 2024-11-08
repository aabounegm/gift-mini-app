<script setup lang="ts">
import {
  MainButton,
  useWebApp,
  useWebAppPopup,
  useWebAppMainButton,
} from "vue-tg";

const { isMainButtonVisible } = useWebAppMainButton();
const { initDataUnsafe } = useWebApp();
const { showAlert } = useWebAppPopup();
</script>

<template>
  <MainButton text="Test" @click="() => showAlert('Hello!')" />
  <div>Username: {{ initDataUnsafe.user?.first_name }}</div>
  <button @click="isMainButtonVisible = !isMainButtonVisible">
    Toggle main button
  </button>
</template>
