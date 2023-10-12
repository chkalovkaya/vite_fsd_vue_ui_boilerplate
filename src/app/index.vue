<script lang="ts" setup>
import { onUnmounted } from 'vue'

import { UiNotifications, useAppStore } from '@shared/ui'

defineOptions({ name: 'AppIndex' })

const AppStore = useAppStore()
AppStore.setWindow()
window.addEventListener('resize', AppStore.setWindow)

onUnmounted(async () =>
    window.removeEventListener('resize', AppStore.setWindow)
)
</script>

<template lang="pug">
main
    Suspense
        RouterView
UiNotifications
</template>

<style lang="sass">
@import "./styles/index.sass"

main
    max-width: $media-desktop-lg
    min-width: $media-mobile
    margin: 0 auto
    padding: 16px

    @media (min-width: $media-tablet)
        padding: 24px
    @media (min-width: $media-desktop-sm)
        padding: 40px
    @media (min-width: $media-desktop-lg)
        padding: 56px
</style>
