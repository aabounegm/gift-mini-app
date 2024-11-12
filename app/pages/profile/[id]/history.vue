<script setup lang="ts">
import { BackButton } from "vue-tg";
import type { HistoryItem } from "~~/shared/types";

const { params } = useRoute();

const { data: history } = useFetch<HistoryItem[]>(
  `/api/users/${params.id}/history`,
  {
    default: () => [],
    transform: (data) =>
      data.map((item) => ({ ...item, timestamp: new Date(item.timestamp) })),
  }
);

const formatter = Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "long",
});

const dailyHistory = computed(() =>
  Map.groupBy(history.value, (item) => formatter.format(item.timestamp))
);
</script>

<template>
  <div>
    <BackButton @click="$router.back()" />

    <ProfileHistoryEmptyState v-if="history.length === 0" />
    <div class="p-4" v-else>
      <header class="text-center my-4">
        <h1 class="text-2xl font-semibold mb-2">Recent Actions</h1>
        <p class="text-subtitle_text_color">Here is your action history.</p>
      </header>

      <main>
        <section v-for="[day, items] in dailyHistory" class="my-3">
          <h2 class="my-3 text-section_header_text_color">{{ day }}</h2>
          <ul class="py-2">
            <template v-for="item in items" :key="item._id">
              <ProfileHistoryListItem :item="item" />
              <hr />
            </template>
          </ul>
        </section>
      </main>
    </div>
  </div>
</template>
