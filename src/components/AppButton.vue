<template>
  <button>
    {{ $props.variant }}
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  /* TS compiletime */
  variant: string
}>(/* JS runtime validation */)
</script>

<style lang="scss" scoped></style>
