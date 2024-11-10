<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: transform 0.3s ease;
}

.page-leave-to {
  transform: translateX(-100%);
}

.page-enter-from {
  transform: translateX(100%);
}
</style>
