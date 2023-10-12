<script lang="ts" setup>
import { ref } from 'vue'

import {
    EnumButtonColor,
    EnumButtonSize,
    EnumDrawers,
    EnumModals,
    useDrawerStore,
    useModalStore,
} from '@shared/ui'

defineOptions({ name: 'UiKitPage' })

const checkbox = ref(false)
const checkboxArray = ref([])
const input = ref('')
const radio = ref('')
const textarea = ref('')
const textareaResize = ref<'none' | 'vertical' | 'horizontal'>('none')
const select = ref()
const selectArray = ref([])
const selectOptions = ref([
    { name: '1', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
])
const openModal = () => useModalStore().setModal(EnumModals.Test, true)
const openDrawer = () => useDrawerStore().setDrawer(EnumDrawers.Test, true)
</script>

<template lang="pug">
.content
    .container
        h2 Button
        .flex
            UiButton Default
            UiButton(:size='EnumButtonSize.Medium') Medium
            UiButton(:size='EnumButtonSize.Big') Big
            UiButton(:color='EnumButtonColor.Blue') Blue
            UiButton(:color='EnumButtonColor.BlueDark') BlueDark
            UiButton(:color='EnumButtonColor.Gray') Gray
            UiButton(:color='EnumButtonColor.Red') Red
            UiButton(:color='EnumButtonColor.White') White
            UiButton(
                :color='EnumButtonColor.White',
                :size='EnumButtonSize.Small') White Small
            UiButton(:color='EnumButtonColor.WhiteRed') White-Red
            UiButton(:color='EnumButtonColor.Transparent') Transparent
            UiButton(disabled) Disabled
    .container
        h2 Select
        .block
            h3 Single {{ select }}
            UiSelect(v-model='select', :options='selectOptions', label='Label')
        .block
            h3 Multiple {{ selectArray }}
            UiSelect(
                v-model:modelArray='selectArray',
                :options='selectOptions',
                label='Label')
    .container
        h2 Checkbox
        .block
            h3 Single
            UiCheckbox(v-model='checkbox', name='test') {{ checkbox }}
        .block
            h3 Multiple
            .flex
                UiCheckbox(v-model:modelArray='checkboxArray', :value='1') 1
                UiCheckbox(v-model:modelArray='checkboxArray', :value='2') 2
            | {{ checkboxArray }}
        .block
            h3 Disabled
            UiCheckbox(v-model:array='checkboxArray', disabled) Disabled
    .container
        h2 Input
        .block
            UiInput(
                v-model='input',
                label='Default',
                placeholder='placeholder')
        .block
            UiInput(
                v-model='input',
                label='Error',
                placeholder='placeholder',
                error)
        .block
            UiInput(label='Disabled', placeholder='placeholder', disabled)
    .container
        h2 Radio
        .flex
            UiRadio(v-model='radio', value='1') 1
            UiRadio(v-model='radio', value='2') 2
            UiRadio(v-model='radio', value='3', disabled) Disabled
        | Radio: {{ radio }}
    .container
        h2 Textarea
        h3 Resize: {{ textareaResize }}
        .flex
            UiRadio(v-model='textareaResize', value='none') none
            UiRadio(v-model='textareaResize', value='vertical') vertical
            UiRadio(v-model='textareaResize', value='horizontal') horizontal
        UiTextarea(
            v-model='textarea',
            label='Default',
            placeholder='placeholder',
            :resize='textareaResize')
        UiTextarea(
            v-model='textarea',
            label='Disabled',
            placeholder='placeholder',
            disabled)
    .flex
        .container
            h2 Modal
            UiButton(@click='openModal') Open Modal
            UiModal(:name='EnumModals.Test', title='title') Test
        .container
            h2 Drawer
            UiButton(@click='openDrawer') Open Drawer
            UiDrawer(:name='EnumDrawers.Test', title='title') Test
</template>

<style lang="sass" scoped>
.content
    padding: 0 40px

    .flex
        display: flex
        flex-flow: row wrap
        align-items: flex-end
        gap: 8px

    .container
        margin: 30px auto

        h2
            margin-bottom: 16px

        h3
            margin-bottom: 8px

        .block
            margin: 16px 0
</style>
