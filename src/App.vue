<script setup lang="ts">
import { useGlobal } from '@/stores/global.store';
import TheModal from './components/modals/TheModal.vue';

const globalStore = useGlobal()

// checking localStorage exist, if not fetch.
globalStore.getInitialAllDatas()

</script>

<template>
  <div class="min-h-screen select-none">
    <TheModal
      v-if="globalStore.modal.state"
      :title="globalStore.modal.title"
      :description="globalStore.modal.description"
    />
    <router-view />
  </div>
</template>

<style>
</style>
