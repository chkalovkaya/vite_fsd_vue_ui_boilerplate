<script lang="ts" setup>
import { type PropType } from 'vue'

import { EnumButtonColor, EnumButtonSize } from './interface'

defineOptions({ name: 'UiButton' })
defineProps({
    type: {
        type: String as PropType<'button' | 'reset' | 'submit'>,
        default: 'button',
    },
    color: String as PropType<EnumButtonColor>,
    size: String as PropType<EnumButtonSize>,
    disabled: Boolean,
    isIcon: Boolean,
    isRound: Boolean,
    icon: String,
})
</script>

<template lang="pug">
button.ui-button(
    :class='[`${color ?? ""} ${size ?? ""}`, { isRound, isIcon }]',
    :type='type',
    :disabled='disabled')
    UiIcon(v-if='icon', :icon='icon')
    slot
</template>

<style lang="sass" scoped>
.ui-button
    color: $color-white
    background-color: $color-green
    width: fit-content
    display: flex
    flex-flow: row nowrap
    align-items: center
    justify-content: center
    gap: 8px
    font-size: 13px
    font-weight: 700
    line-height: 24px
    letter-spacing: 1px
    text-transform: uppercase
    transition: $transition-25 background-color linear
    border: none
    border-radius: 1px
    cursor: pointer
    padding: 8px 24px

    &:hover
        background-color: $color-green-hover

    &.medium
        border-radius: 8px
        padding: 12px 16px

    &.big
        height: 56px
        border-radius: 8px

    &.transparent
        background-color: transparent
        color: $text-black
        padding: 0

        &:disabled
            background-color: transparent

    &.white
        color: $text-black
        background-color: $color-white
        border: 1px solid $border-button
        padding: 7px 24px

        &:hover
            background-color: $bg-white-hover

        &.small
            color: rgba(32, 62, 71, 0.6)
            min-width: 32px
            font-size: 12px
            font-weight: 500
            line-height: 14px
            text-transform: none
            border: 1px solid $border-button-light
            border-radius: 4px
            padding: 8px 12px

    &.white-red
        color: $color-red
        background-color: $color-white
        border: 1px solid $color-red
        padding: 7px 24px

        &:hover
            background-color: $bg-white-hover

    &.gray
        background-color: $bg-gray

    &.blue
        color: white
        background-color: $color-blue-deep

        &:hover
            background-color: $color-blue

    &.blue-dark
        color: white
        background-color: $bg-blue-dark

        &:hover
            background-color: $bg-blue-dark-hover

    &.red
        color: white
        background-color: $color-red-light

        &:hover
            background-color: $color-red

    &.isRound
        width: 48px
        height: 48px
        border-radius: 24px

    &.isIcon
        background-color: transparent
        width: 40px
        height: 40px
        padding: 0

    &:disabled
        background-color: $bg-disabled
        border-color: $border-gray
        color: $text-disabled
        cursor: default
        pointer-events: none
</style>
