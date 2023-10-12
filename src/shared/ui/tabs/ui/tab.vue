<script lang="ts" setup>
import { type ITab } from '../model'

defineOptions({ name: 'UiTab' })
defineProps<{ tab: ITab; active: boolean }>()
</script>

<template lang="pug">
.ui-tab
    .ui-tab__content(:class='{ active, disabled: !tab.value }')
        slot(v-if='tab.slot', :name='tab.slot')
        .ui-tab__text(v-else) {{ tab.text }}
</template>

<style lang="sass" scoped>
.ui-tab
    width: auto
    height: 100%
    display: flex
    align-items: center
    cursor: pointer

    &__content
        height: 100%
        display: flex
        align-items: center
        font-size: 12px
        border-bottom: solid 4px transparent

        &.active
            font-weight: 700
            border-bottom: solid 4px $color-green

        &.disabled
            color: $text-gray
            cursor: default

    &__text
        letter-spacing: 0.5px
        text-align: center
</style>
