<script lang="ts" setup>
import { computed } from 'vue'

import { EnumWindowBreakpoints, useAppStore } from '@shared/ui'

defineOptions({ name: 'UiSelectDropdown' })
defineProps({ selectId: String, isOpen: Boolean })
const emit = defineEmits(['close'])

const AppStore = useAppStore()
const isMobile = computed(() =>
    AppStore.getIsBreakpoint(EnumWindowBreakpoints.Tablet, 'less')
)
</script>

<template lang="pug">
UiAccordion
    .ui-select-dropdown(v-if='isOpen && !isMobile')
        slot
UiDrawer(v-if='isMobile', :name='selectId', @close='emit("close")')
    slot
</template>

<style lang="sass" scoped>
.ui-select-dropdown
    background: $color-white
    width: 100%
    border: 1px solid $border-el
    border-top: 1px solid transparent
    border-radius: 1px
    box-shadow: $box-shadow
    position: absolute
    top: 100%
    left: 0
    z-index: 1
</style>
