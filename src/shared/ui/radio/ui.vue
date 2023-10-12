<script lang="ts" setup>
import { computed } from 'vue'

import { useGenerateId } from '@shared/lib'

defineOptions({ name: 'UiRadio' })
const modelValue = defineModel<string | number>()
const props = defineProps({
    value: [String, Number],
    label: String,
    disabled: Boolean,
})

const id = useGenerateId('radio')
const onChange = (e: Event) => {
    if ((e.target as HTMLInputElement).checked === true) {
        modelValue.value = props.value
    }
}
const checked = computed(() => modelValue.value === props.value)
</script>

<template lang="pug">
.ui-radio
    input.ui-radio__native(
        type='radio',
        :id='id',
        :value=value,
        :checked='checked',
        :disabled='disabled',
        @change='onChange')
    label.ui-radio__label(:for='id')
        .slot(v-if='!!$slots["default"]')
            slot
</template>

<style lang="sass" scoped>
.ui-radio
    position: relative

    &__label
        color: $text-black
        display: flex
        align-items: flex-start
        user-select: none
        cursor: pointer

        &::before
            content: ''
            background-color: $color-white
            width: 20px
            height: 20px
            border: 1px solid $border-el
            border-radius: 100%

        .slot
            margin-left: 16px

    &__native
        position: absolute
        z-index: -1
        opacity: 0

        &:checked + label::before
            border: 6px solid $color-green

        &:disabled + label::before
            background-color: $bg-disabled
            cursor: default
</style>
