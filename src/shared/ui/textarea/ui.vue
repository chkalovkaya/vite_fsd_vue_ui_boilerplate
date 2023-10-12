<script lang="ts" setup>
import { type PropType } from 'vue'

import { useGenerateId } from '@shared/lib'

defineOptions({ name: 'UiTextarea' })
const emit = defineEmits(['change', 'focus'])
const modelValue = defineModel<string>()
defineProps({
    label: String,
    placeholder: String,
    required: Boolean,
    maxlength: Number,
    disabled: Boolean,
    resize: String as PropType<'none' | 'vertical' | 'horizontal'>,
})

const id = useGenerateId('textarea')
const onInput = (e: Event) =>
    (modelValue.value = (e.target as HTMLInputElement).value)
const onChange = (e: Event) =>
    emit('change', (e.target as HTMLInputElement).value)
const onFocus = () => emit('focus')
</script>

<template lang="pug">
.ui-textarea
    label.ui-textarea__label(v-if='label', :for='id') {{ label }}
    textarea.ui-textarea__native(
        :id='id',
        :placeholder='placeholder',
        :required='required',
        :value='modelValue',
        :maxlength='maxlength',
        :disabled='disabled',
        spellcheck='true',
        @input='onInput',
        @change='onChange',
        @focus='onFocus')
</template>

<style lang="sass" scoped>
.ui-textarea
    position: relative

    &__label
        display: block
        color: $text-gray
        margin-bottom: 8px

    &__native
        background: $color-white
        width: 100%
        height: 40px
        min-height: 45px
        border: 1px solid $border-el
        border-radius: 1px
        resize: v-bind(resize)
        padding: 12px 16px

        &::-webkit-textarea-placeholder,
        &::-moz-placeholder,
        &::-ms-textarea-placeholder
            text-overflow: ellipsis
            color: $text-gray
            line-height: 16px
            opacity: 1
            transition: opacity $transition-50 ease

        &:focus::-moz-placeholder,
        &:focus::-webkit-textarea-placeholder,
        &:focus::-ms-textarea-placeholder
            opacity: 0

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
