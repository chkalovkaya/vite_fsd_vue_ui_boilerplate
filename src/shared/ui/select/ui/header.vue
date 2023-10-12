<script lang="ts" setup>
import { computed } from 'vue'

import { EnumIcon } from '@shared/ui'

import { type ISelectOption } from '../model'

defineOptions({ name: 'UiSelectHeader' })
const props = defineProps<{
    modelValue: ISelectOption | undefined
    modelArray: ISelectOption[] | undefined
    placeholder: string
    multiple: boolean
    isOpen: boolean
    disabled: boolean
}>()

const text = computed(() => {
    if (props.multiple && props.modelArray?.length) {
        return props.modelArray?.length === 1
            ? props.modelArray[0]?.name
            : `Выбрано ${props.modelArray.length}`
    } else if (!props.multiple && props.modelValue) {
        return (props.modelValue as ISelectOption)?.name
    } else {
        return props.placeholder
    }
})

const isPlaceholder = computed(
    () =>
        (props.multiple && !props.modelArray?.length) ||
        (!props.multiple && !props.modelValue)
)
</script>

<template lang="pug">
.ui-select-header(:class='{ isOpen, disabled }')
    .ui-select-header__option(:class='{ isPlaceholder }') {{ text }}
    UiButton.ui-select-header__arrow(
        :class='{ isOpen }',
        :icon='EnumIcon.SelectArrow',
        is-icon)
</template>

<style lang="sass" scoped>
.ui-select-header
    background: $color-white
    height: 40px
    display: grid
    grid-template-columns: 1fr auto
    border: 1px solid $border-el
    border-radius: 1px
    position: relative

    &.isOpen
        border: 1px solid $color-green

    &:hover
        background: $bg-white-hover

    &.disabled
        background-color: $bg-disabled
        border-color: $border-gray
        color: $text-disabled
        cursor: default
        pointer-events: none

    &__arrow
        transition: transform $transition-25

        &.isOpen
            transform: rotate(180deg)

    &__option
        height: 38px
        line-height: 16px
        border-radius: 1px
        position: relative
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        cursor: pointer
        padding: 12px 0 12px 16px

        &.isPlaceholder
            color: $text-gray
</style>
