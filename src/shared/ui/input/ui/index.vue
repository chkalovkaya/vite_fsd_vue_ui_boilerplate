<script lang="ts" setup>
import { type PropType } from 'vue'

import { useGenerateId } from '@shared/lib'

defineOptions({ name: 'UiInput' })
const emit = defineEmits(['change', 'focus'])
defineProps({
    type: {
        type: String as PropType<'text' | 'password' | 'number'>,
        default: 'text',
    },
    label: String,
    placeholder: String,
    disabled: Boolean,
    maxlength: Number,
    error: Boolean,
    pattern: String,
    min: Number,
    max: Number,
    required: Boolean,
    iconLeft: String,
    iconRight: String,
})

const modelValue = defineModel<string | number>()
const id = useGenerateId('input')

const onInput = (e: Event) =>
    (modelValue.value = (e.target as HTMLInputElement).value)
const onChange = (e: Event) =>
    emit('change', (e.target as HTMLInputElement).value)
const onFocus = () => emit('focus')
</script>

<template lang="pug">
.ui-input
    label.ui-input__label(v-if='label', :for='id') {{ label }}
    UiIcon.ui-input__icon.left(v-if='iconLeft', :icon='iconLeft')
    input.ui-input__native(
        :value='modelValue',
        :type='type',
        :id='id',
        :placeholder='placeholder',
        :pattern='pattern',
        :required='required',
        :maxlength='maxlength',
        :min='min',
        :max='max',
        :disabled='disabled',
        :class='{ error, "icon-left": iconLeft, "icon-right": iconRight }',
        @input='onInput',
        @change='onChange',
        @focus='onFocus')
    UiIcon.ui-input__icon.right(v-if='iconRight', :icon='iconRight')
</template>

<style lang="sass" scoped>
.ui-input
    position: relative

    &__label
        color: $text-gray
        display: block
        margin-bottom: 8px

    &__icon
        position: absolute
        top: 50%
        transform: translateY(-50%)
        &.left
            left: 16px
        &.right
            right: 16px

    &__native
        background: $color-white
        width: 100%
        height: 40px
        line-height: 40px
        border: 1px solid $border-el
        border-radius: 1px
        padding: 12px 16px

        &.icon-left
            padding-left: 48px
        &.icon-right
            padding-right: 48px

        &::-webkit-input-placeholder
            color: $text-gray
            font-weight: 400
            opacity: 1
            transition: opacity $transition-50 ease
        &::-moz-placeholder
            color: $text-gray
            font-weight: 400
            opacity: 1
            transition: opacity $transition-50 ease
        &::-ms-input-placeholder
            color: $text-gray
            font-weight: 400
            opacity: 1
            transition: opacity $transition-50 ease

        &:focus::-webkit-input-placeholder
            opacity: 0
        &:focus::-moz-placeholder
            opacity: 0
        &:focus::-ms-input-placeholder
            opacity: 0

        &.error
            border-color: $color-red

        &:disabled
            background-color: $bg-disabled
            border-color: $border-gray
            cursor: default

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button
            -webkit-appearance: none
            margin: 0

        &[type=number]
            -moz-appearance: textfield
</style>
