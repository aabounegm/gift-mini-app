<script setup lang="ts">
const open = defineModel({
  default: false,
});

const dialog = ref<HTMLDialogElement>();

watchEffect(() => {
  if (open.value) {
    dialog.value?.showModal();
  } else {
    dialog.value?.close();
  }
});

function handleClickOutside(e: MouseEvent) {
  if (e.target === dialog.value) {
    open.value = false;
  }
}
</script>

<template>
  <dialog
    ref="dialog"
    class="m-0 bottom-0 max-w-full w-full h-3/4 rounded-t-xl bg-bg-secondary p-4"
    style="inset-block-start: auto"
    @click="handleClickOutside"
  >
    <!-- Content wrapper to capture clicks -->
    <div class="w-full h-full">
      <button
        autofocus
        @click="open = false"
        class="bg-gray-300 text-gray-600 rounded-full size-6 absolute right-4"
      >
        &times;
      </button>
      <slot />
    </div>
  </dialog>
</template>

<style scoped>
dialog[open] {
  transform: translateY(0);
}

dialog {
  transform: translateY(100%);
  transition: all 0.3s allow-discrete;
}

@starting-style {
  dialog[open] {
    transform: translateY(100%);
  }
}

dialog::backdrop {
  background-color: rgb(0 0 0 / 0%);
  transition: all 0.3s allow-discrete;
}

dialog[open]::backdrop {
  background-color: rgb(0 0 0 / 30%);
}

@starting-style {
  dialog[open]::backdrop {
    background-color: rgb(0 0 0 / 0%);
  }
}
</style>
