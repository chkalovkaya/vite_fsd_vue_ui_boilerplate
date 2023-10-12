<script lang="ts" setup>
import { computed } from 'vue'

import { EnumWindowBreakpoints, useAppStore } from '@shared/ui'

import { type ITable } from '../model'
import UiTableDesktop from './table-desktop.vue'
import UiTableMobile from './table-mobile.vue'

defineOptions({ name: 'UiTable' })
const emit = defineEmits(['infinite'])
defineProps<{ data: ITable; infinite?: boolean }>()

const AppStore = useAppStore()
const isMobile = computed(() =>
    AppStore.getIsBreakpoint(EnumWindowBreakpoints.Tablet, 'less')
)
const component = computed(() =>
    isMobile.value ? UiTableMobile : UiTableDesktop
)
</script>

<template lang="pug">
component(
    :is='component',
    :data='data',
    :infinite='infinite',
    @infinite='emit("infinite")')
</template>
