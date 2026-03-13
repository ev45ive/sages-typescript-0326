<template>
  <div class="text-2xl">Design View</div>

  <div class="grid gap-5">
    <AppButton variant="test" class="bg-green-400 text-white"> Submit </AppButton>
    <AppButton class="bg-red-400 text-white">Cancel</AppButton>
    <AppButton class="bg-blue-400 text-white">Info</AppButton>
  </div>
</template>

<script lang="ts" setup>
import { default as AppButton } from '../components/AppButton.vue'
</script>

<style scoped></style>
