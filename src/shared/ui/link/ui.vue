<script lang="ts" setup>
import { type RouteLocationRaw, useLink } from 'vue-router'

defineOptions({ name: 'UiLink' })
const props = defineProps<{
    to: RouteLocationRaw
    replace?: boolean
    name?: string
    disabled?: boolean
    target?: '_blank'
}>()
const { href, navigate } = useLink({
    to: props.to,
    replace: props.replace,
})
</script>

<template lang="pug">
a.ui-link(
    :href='href',
    :target='target',
    @click='navigate',
    :class='{ disabled }')
    slot(v-if='$slots["default"]')
    template(v-else-if='name') {{ name }}
</template>

<style lang="sass">
.ui-link
    color: $color-green
    text-decoration: none
    cursor: pointer

    &:hover
        color: $color-green-hover

    &.disabled
        color: $text-disabled !important
        pointer-events: none
        cursor: default
</style>
