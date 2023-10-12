<script lang="ts" setup>
import { computed } from 'vue'

import { useGenerateId } from '@shared/lib'
import { EnumIcon } from '@shared/ui'

defineOptions({ name: 'UiCheckbox' })

const modelValue = defineModel({ type: Boolean, default: undefined })
const modelArray = defineModel('modelArray', { type: Array })

const props = defineProps({
    value: Number,
    disabled: Boolean,
})

const id = computed(() => useGenerateId('checkbox'))
const isChecked = computed(() =>
    modelArray.value
        ? modelArray.value?.includes(props.value)
        : modelValue.value
)

const onCheck = (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked
    const checkboxValue = Number((e.target as HTMLInputElement).value)

    if (modelArray.value) {
        modelArray.value = checked
            ? [...modelArray.value, checkboxValue]
            : modelArray.value.filter(val => val !== checkboxValue)
    } else {
        modelValue.value = checked
    }
}
</script>

<template lang="pug">
.ui-checkbox
    input.ui-checkbox__native(
        type='checkbox',
        :id='id',
        :value='value',
        :disabled='disabled',
        :checked='isChecked',
        @change='onCheck')
    label.ui-checkbox__label(:for='id', :class='{ disabled }')
        .ui-checkbox__container(
            :class='{ disabled, isChecked, hover: !disabled && !isChecked }')
            UiIcon(v-if='isChecked', :icon='EnumIcon.CheckboxArrow')
        .ui-checkbox__slot(v-if='!!$slots["default"]')
            slot
</template>

<style lang="sass" scoped>
.ui-checkbox
    position: relative

    &__label
        color: $text-black
        display: flex
        align-items: flex-start
        user-select: none
        cursor: pointer

        &.disabled
            cursor: default


    &__container
        width: 20px
        height: 20px
        display: flex
        justify-content: center
        align-items: center
        flex-shrink: 0
        flex-grow: 0
        border: 1px solid $border-el
        border-radius: 2px
        background-color: $color-white

        &.isChecked
            border-color: $color-green

        label:hover &.hover
            border-color: $color-green

        &.disabled
            background-color: $bg-disabled

    &__slot
        margin-left: 16px

    &__native
        position: absolute
        z-index: -1
        opacity: 0
</style>
