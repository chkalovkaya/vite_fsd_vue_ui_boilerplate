<script lang="ts" setup>
import { UiIcon } from '@shared/ui/icon'

import { type ISelectOption } from '../model'

defineOptions({ name: 'UiSelectSelected' })
defineProps({ placeholder: String })

const modelArray = defineModel<ISelectOption[]>('modelArray')
const onUnselect = (option: ISelectOption) => {
    modelArray.value = modelArray.value!.filter(
        opt => opt.value !== option.value
    )
}
</script>

<template lang="pug">
.ui-select-selected
    .ui-select-selected__option(
        v-for='option in modelArray',
        :key='option.value',
        @click.stop='onUnselect(option)')
        | {{ option.name }}
        UiIcon(icon='close')
</template>

<style lang="sass" scoped>
.ui-select-selected
    max-height: 110px
    display: flex
    flex-flow: row wrap
    gap: 8px
    overflow: auto
    padding: 16px

    @media (max-width: $media-mobile-max)
        padding-bottom: 0

    &__option
        background: $bg-gray-hover
        display: flex
        align-items: center
        gap: 8px
        border: 1px solid $bg-gray-hover
        cursor: pointer
        padding: 8px
</style>
