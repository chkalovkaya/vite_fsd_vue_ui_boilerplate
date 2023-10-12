<script lang="ts" setup>
import { onMounted } from 'vue'

import { type ITab } from '../model'
import UiTab from './tab.vue'

defineOptions({ name: 'UiTabs' })
const emit = defineEmits(['tabs'])
const modelValue = defineModel<string>()
const props = defineProps<{ tabs: ITab[] }>()

const onTab = (tab: ITab) => {
    if (tab.value) {
        modelValue.value = tab.value
        emit('tabs', tab.value)
    }
}
onMounted(() => (modelValue.value = props.tabs[0].value))
</script>

<template lang="pug">
.ui-tabs
    UiTab(
        v-for='tab in tabs',
        :key='`tab-${tab.value}`',
        :tab='tab',
        :active='tab.value === modelValue',
        @click='onTab(tab)')
</template>

<style lang="sass" scoped>

.ui-tabs
    width: 100%
    height: 32px
    display: flex
    align-items: center
    gap: 32px
    border-bottom: 1px solid $border-gray
</style>
