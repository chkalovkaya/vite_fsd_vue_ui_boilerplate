<script lang="ts" setup>
// import { useDebounce } from '@shared/lib'
import { EnumIcon } from '@shared/ui'
import UiInput from './index.vue'

defineOptions({ name: 'UiInputSearch' })
const emit = defineEmits(['change', 'focus'])
defineProps({
    label: String,
    placeholder: String,
    disabled: Boolean,
    maxlength: Number,
    error: Boolean,
    required: Boolean,
    debounce: Number,
})

const modelValue = defineModel<string>()
const onInput = (value: string) => {
    modelValue.value = value
    // useDebounce(() => (modelValue.value = value), props.debounce ?? 300)
}
const onChange = (value: string) => emit('change', value)
const onFocus = () => emit('focus')
</script>

<template lang="pug">
UiInput(
    type='text',
    :modelValue='modelValue',
    :label='label',
    :placeholder='placeholder',
    :disabled='disabled',
    :maxlength='maxlength',
    :error='error',
    :required='required',
    @update:modelValue='onInput',
    @change='onChange',
    @focus='onFocus',
    :icon-right='EnumIcon.Search')
</template>
