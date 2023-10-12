<script lang="ts" setup>
import { computed, onUnmounted, type PropType, watch } from 'vue'

import { EnumIcon } from '@shared/ui'

import { EnumTransitions } from '../transition'
import { EnumModals, useModalStore } from './model'

defineOptions({ name: 'UiModal' })
const emit = defineEmits(['close'])
const props = defineProps({
    name: { type: String as PropType<EnumModals>, required: true },
    title: String,
    isClose: { type: Boolean, default: true },
})

const ModalStore = useModalStore()
const isOpen = computed(() => ModalStore.getModal(props.name))

const onClose = () => {
    ModalStore.setModal(props.name, false)
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
Teleport(to='#Modals')
    Transition(:name='EnumTransitions.Fade', appear)
        .ui-modal(v-if='isOpen', @click.self='onClose')
            .ui-modal__container
                .ui-modal__header(v-if='title || isClose')
                    .ui-modal__title {{ title }}
                    UiButton.ui-modal__close(
                        v-if='isClose',
                        is-icon,
                        :icon='EnumIcon.Close',
                        @click='onClose')
                slot
</template>

<style lang="sass" scoped>
.ui-modal
    width: 100%
    height: 100%
    display: flex
    justify-content: space-around
    align-items: center
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 50
    cursor: pointer

    &:last-child
        background: $bg-shadow

    &:not(:last-child)
        display: none

    &__container
        background: $color-white
        width: calc(100% - 32px)
        max-height: 100%
        display: flex
        flex-direction: column
        gap: 16px
        overflow: auto
        cursor: default
        padding: 32px

        @media (min-width: $media-desktop-xs)
            width: auto
            max-width: 960px

    &__header
        display: flex
        align-items: center
        gap: 16px

    &__title
        flex-grow: 1
        font-weight: 700
        font-size: 16px
        line-height: 24px

    &__close
        margin-left: auto
        cursor: pointer
</style>
