<script lang="ts" setup>
import { computed } from 'vue'

import { useGenerateId } from '@shared/lib'

import { type ITable } from '../model'

defineOptions({ name: 'UiTableDesktop' })
const emit = defineEmits(['infinite'])
const props = defineProps<{ data: ITable; infinite?: boolean }>()

const getValue = (value?: number) => value?.toLocaleString() ?? '-'
const getPercentColor = (value: number) => {
    if (value > 0) return 'green'
    else if (value < 0) return 'red'
    else return
}
const titleWidth = '138px'
const cellWidth = computed(
    () => `calc(100% - ${titleWidth} / ${props.data.header.length - 1})`
)
</script>

<template lang="pug">
.ui-table-desktop
    .ui-table-desktop__row
        span(
            v-for='(name, i) in data.header',
            :key='name',
            :class='i === 0 ? "ui-table-desktop__title" : "ui-table-desktop__value"') {{ name }}
    hr
    .ui-table-desktop__body
        .ui-table-desktop__row(v-for='row in data.body', :key='row.title')
            span.ui-table-desktop__title(:title='row.title') {{ row.title }}
            span.ui-table-desktop__value(
                v-for='value in row.values',
                :key='useGenerateId("ui-table-desktop-value")')
                | {{ getValue(value.value) }}
                template(v-if='value.subValue || value.subValue === 0') &nbsp;
                span(
                    v-if='value.subValue || value.subValue === 0',
                    :class='getPercentColor(value.subValue)') {{ value.subValue }}%

        UiInfinite(v-if='infinite', @infinite='emit("infinite")')
</template>

<style lang="sass" scoped>
.ui-table-desktop
    display: flex
    flex-flow: column
    gap: 16px

    &__body
        height: 100%
        display: flex
        flex-flow: column
        gap: 24px
        overflow-y: auto

    &__row
        display: flex
        gap: 16px

    &__title
        width: v-bind(titleWidth)
        flex-shrink: 0
        font-size: 12px
        font-weight: 700
        line-height: 16px
        letter-spacing: 0.5px
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        cursor: default

    &__value
        width: v-bind(cellWidth)
        font-size: 12px
        font-weight: 700
        letter-spacing: 0.5px
        text-align: right

        & .green
            color: $color-green

        & .red
            color: $color-red
</style>
