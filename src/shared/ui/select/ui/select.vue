<script lang="ts" setup generic="T, K">
import { computed, type PropType, ref, watch } from 'vue'

import { useGenerateId } from '@shared/lib'
import { useDrawerStore } from '@shared/ui'

import { type ISelectOption } from '../model'
import UiSelectDropdown from './dropdown.vue'
import UiSelectHeader from './header.vue'
import UiSelectOptions from './options.vue'
import UiSelectSelected from './selected.vue'

defineOptions({ name: 'UiSelect' })
const emit = defineEmits(['change', 'infinite', 'close'])
const props = defineProps({
    options: {
        type: Array as PropType<ISelectOption<T, K>[]>,
        default: () => [],
    },
    disabled: Boolean,
    label: String,
    infinite: Boolean,
    index: Number,
    placeholder: {
        type: String,
        default: 'Выберите',
    },
})

const modelValue = defineModel<ISelectOption<T, K> | undefined>('modelValue')
const modelArray = defineModel<ISelectOption<T, K>[] | undefined>('modelArray')

const multiple = computed(() => modelArray.value !== undefined)

const DrawerStore = useDrawerStore()
const selectId = useGenerateId('select')
const isOpen = ref(false)
const closeHandler = () => {
    isOpen.value = false
    DrawerStore.setDrawer(selectId, false)
    emit('close')
}
const toggleHandler = () => {
    isOpen.value = !isOpen.value
    DrawerStore.setDrawer(selectId, isOpen.value)
}

const isSelected = computed(() => multiple.value && modelArray.value?.length)

const setInitValue = () => {
    const el = props.options[props.index as number]
    multiple.value ? (modelArray.value = [el]) : (modelValue.value = el)
}
if (props.index !== undefined) {
    setInitValue()
    watch(
        () => props.options,
        () => setInitValue()
    )
}
</script>

<template lang="pug">
.ui-select(v-click-outside='closeHandler')
    label.ui-select__label(v-if='label') {{ label }}
    UiSelectHeader(
        :modelValue='modelValue',
        :modelArray='modelArray',
        :disabled='disabled',
        :is-open='isOpen',
        :multiple='multiple',
        :placeholder='placeholder',
        @click='toggleHandler')
    UiSelectDropdown(
        :is-open='isOpen',
        :select-id='selectId',
        @close='closeHandler')
        UiSelectSelected(v-if='isSelected', v-model:modelArray='modelArray')
        slot
        UiSelectOptions(
            :options='options',
            v-model:modelValue='modelValue',
            v-model:modelArray='modelArray',
            :multiple='multiple',
            @close='closeHandler')
            UiInfinite(v-if='infinite', @infinite='emit("infinite")')
</template>

<style lang="sass" scoped>
.ui-select
    position: relative

    &__label
        display: block
        color: $text-gray
        margin-bottom: 8px
</style>
