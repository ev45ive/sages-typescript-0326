<template>
  <div class="text-2xl">Design View</div>

  <div class="grid gap-5 justify-center">
    <AppButton size="lg" variant="danger">Submit</AppButton>
    <AppButton variant="ghost">Cancel</AppButton>
    <AppButton>Info</AppButton>
  </div>
</template>

<script setup lang="ts">
import AppButton from '../components/AppButton.vue'
</script>

<style scoped></style>
