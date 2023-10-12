<script lang="ts" setup>
import { computed } from 'vue'

import { useGenerateId } from '@shared/lib'

import { type ITable } from '../model'

defineOptions({ name: 'UiTableMobile' })
const emit = defineEmits(['infinite'])
const props = defineProps<{ data: ITable; infinite?: boolean }>()

const header = computed(() =>
    props.data.header.slice(1, props.data.header.length + 1)
)

const getValue = (value?: number) => value?.toLocaleString() ?? '-'

const getPercentColor = (value: number) => {
    if (value > 0) return 'green'
    else if (value < 0) return 'red'
    else return
}
</script>

<template lang="pug">
.ui-table-mobile
    .ui-table-mobile__container(
        v-for='{ title, values } in data.body',
        :key='title')
        span.ui-table-mobile__descr {{ title }}
        .ui-table-mobile__row(
            v-for='(value, value_index) in values',
            :key='useGenerateId("ui-table-mobile-value")')
            span.ui-table-mobile__title {{ header[value_index] }}
            span.ui-table-mobile__dots
            span.ui-table-mobile__value
                | {{ getValue(value.value) }}
                template(v-if='value.subValue || value.subValue === 0') &nbsp;
                span(
                    v-if='value.subValue || value.subValue === 0',
                    :class='getPercentColor(value.subValue)') {{ value.subValue }}%

    UiInfinite(v-if='infinite', @infinite='emit("infinite")')
</template>

<style lang="sass" scoped>
.ui-table-mobile
    max-height: 440px
    display: flex
    flex-flow: column
    gap: 16px
    overflow-y: auto

    &__container
        display: flex
        flex-flow: column
        gap: 8px

    &__descr
        width: 100%
        font-size: 12px
        font-weight: 700
        line-height: 16px
        letter-spacing: 0.5px

    &__row
        display: flex
        align-items: baseline
        gap: 8px

    &__title
        color: $text-gray
        font-size: 12px
        font-weight: 700
        line-height: 16px
        letter-spacing: 0.5px

    &__value
        font-size: 12px
        font-weight: 700
        line-height: 16px
        letter-spacing: 0.5px

        & .green
            color: $color-green

        & .red
            color: $color-red

    &__dots
        flex-grow: 1
        border-bottom: 1px dotted $border-button
</style>
