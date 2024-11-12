<script setup lang="ts">
const { data: users } = useFetch("/api/users", {
  default: () => [],
});

const search = ref("");
const filteredUsers = computed(() =>
  users.value
    .map((user, idx) => ({
      ...user,
      position: idx + 1,
    }))
    .filter((user) =>
      user.name.toLowerCase().includes(search.value.toLowerCase())
    )
);
</script>

<template>
  <main class="p-3">
    <input
      v-model="search"
      :placeholder="$t('leaderboard.search')"
      class="text-center w-full bg-secondary_bg_color rounded-xl p-2"
    />
    <hr class="my-2" />
    <ul>
      <template v-for="user in filteredUsers" :key="user._id">
        <LeaderboardListItem :user="user" :position="user.position" />
        <hr />
        <!-- TODO: make my list item sticky -->
      </template>
    </ul>
  </main>
</template>
