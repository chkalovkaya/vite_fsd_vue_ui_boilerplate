<script lang="ts" setup>
import { CONFIG } from '@shared/config'

defineOptions({ name: 'UiIcon' })
defineProps<{ icon: string }>()
</script>

<template lang="pug">
img.ui-icon(:src='`${CONFIG.baseUrl}icons/${icon}.svg`')
</template>

<style lang="sass" scoped>
.ui-icon
    display: block
</style>
