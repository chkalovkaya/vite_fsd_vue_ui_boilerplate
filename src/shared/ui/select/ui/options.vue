<script lang="ts" setup>
import { computed, toRaw } from 'vue'

import { type ISelectOption } from '../model'

defineOptions({ name: 'UiSelectOptions' })
const emit = defineEmits(['close'])
const props = defineProps<{
    options: ISelectOption[]
    multiple: boolean
}>()

const modelValue = defineModel<ISelectOption | undefined>('modelValue')
const modelArray = defineModel<ISelectOption[]>('modelArray')

const onSelect = (option: ISelectOption) => {
    if (!props.multiple) {
        modelValue.value = option
        emit('close')
    } else {
        const el = modelArray.value?.find(
            opt => toRaw(opt).value === option?.value
        )
        if (!el) {
            modelArray.value?.push(option as ISelectOption)
        } else {
            modelArray.value = modelArray.value?.filter(
                opt => toRaw(opt).value !== option?.value
            )
        }
    }
}

const isSelected = computed(() => (option: ISelectOption) => {
    if (props.multiple) {
        return modelArray.value?.find(opt => toRaw(opt).value === option?.value)
    } else {
        return (
            toRaw(modelValue.value) === option &&
            toRaw(modelValue.value) !== undefined
        )
    }
})
</script>

<template lang="pug">
.ui-select-options
    .ui-select-options__option(
        v-for='option in options',
        :key='option.value',
        :title='option?.name',
        :class='{ selected: isSelected(option) }',
        @click.stop='onSelect(option)') {{ option?.name }}
    slot
</template>

<style lang="sass" scoped>
.ui-select-options
    @media (min-width: $media-tablet)
        max-height: 300px
        overflow: auto

    &__option
        height: 38px
        line-height: 16px
        border-radius: 1px
        position: relative
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        cursor: pointer
        padding: 12px 16px

        &:hover
            background: $bg-white-hover

        &.selected
            background: $bg-gray-hover
            font-weight: 700
</style>
