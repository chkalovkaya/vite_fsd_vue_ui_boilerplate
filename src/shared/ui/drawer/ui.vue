<script lang="ts" setup>
import { computed, onUnmounted, type PropType, watch } from 'vue'

import { EnumTransitions } from '../transition'
import { EnumDrawers, useDrawerStore } from './model'

defineOptions({ name: 'UiDrawer' })
const emit = defineEmits(['close'])
const props = defineProps({
    name: { type: String as PropType<EnumDrawers | string>, required: true },
    title: String,
    isClose: Boolean,
    transition: {
        type: String as PropType<EnumTransitions>,
        default: EnumTransitions.Bottom,
    },
})

const DrawerStore = useDrawerStore()
const isOpen = computed(() => DrawerStore.getDrawer(props.name))

const onClose = () => {
    DrawerStore.setDrawer(props.name, false)
    emit('close')
}
const onKeyDown = ({ code }: KeyboardEvent) => {
    if (code === 'Escape') onClose()
}

watch(isOpen, value => {
    if (value) {
        window.addEventListener('keydown', onKeyDown)
        document.body.classList.add('hidden')
    } else {
        window.removeEventListener('keydown', onKeyDown)
        document.body.classList.remove('hidden')
    }
})
onUnmounted(() => {
    window.removeEventListener('keydown', onKeyDown)
    document.body.classList.remove('hidden')
})
</script>

<template lang="pug">
Teleport(to='#Drawers')
    .ui-drawer
        Transition(:name='EnumTransitions.Fade')
            .ui-drawer__overlay(v-if='isOpen', @click.self='onClose')
        Transition(:name='transition')
            .ui-drawer__container(v-if='isOpen', :class='transition')
                .ui-drawer__header(v-if='title || isClose')
                    .ui-drawer__title {{ title }}
                    UiButton.ui-drawer__close(
                        v-if='isClose',
                        is-icon,
                        icon='close',
                        @click='onClose')
                .ui-drawer__content
                    slot
</template>

<style lang="sass" scoped>
.ui-drawer
    &__overlay
        background: $bg-shadow
        width: 100%
        height: 100%
        display: flex
        align-items: flex-end
        position: fixed
        top: 0
        left: 0
        right: 0
        bottom: 0
        z-index: 50
        cursor: pointer

    &__container
        background: $color-white
        display: flex
        flex-flow: column
        align-items: flex-end
        position: fixed
        z-index: 51
        cursor: default

        &.top
            width: 100%
            left: 0
            top: 0

        &.left
            width: 300px
            height: 100%
            left: 0
            top: 0

        &.bottom
            width: 100%
            max-height: 85vh
            overflow: auto
            left: 0
            bottom: 0

            &::before
                content: ''
                background-color: $color-white
                width: 64px
                height: 4px
                position: absolute
                top: -8px
                left: 50%
                transform: translateX(-50%)

        &.right
            width: 300px
            height: 100%
            right: 0
            top: 0

    &__content
        width: 100%
        max-height: 100%
        overflow: auto

    &__header
        width: 100%
        display: flex
        align-items: center
        gap: 16px
        padding: 16px 16px 0

    &__title
        flex-grow: 1
        font-weight: 700
        font-size: 16px
        line-height: 24px

    &__close
        margin-left: auto
        cursor: pointer
</style>
