<script lang="ts" setup>
import { ref } from 'vue'

import { EnumIcon } from '@shared/ui'

defineOptions({ name: 'UiDetails' })
const emit = defineEmits(['expand', 'shrink'])

const details = ref<HTMLDetailsElement | null>(null)
const summary = ref<HTMLElement | null>(null)
const expand = ref<HTMLDivElement | null>(null)
const icon = ref<HTMLImageElement | null>(null)

let animation = ref<Animation | null>(null)
let isExpanding = ref<Boolean>(false)
let isShrinking = ref<Boolean>(false)

const detailsHandler = (e: Event): void => e.preventDefault()

const titleHandler = (e: Event): void => {
    e.preventDefault()
    details.value!.style.overflow = 'hidden'

    if (isShrinking.value || !details.value?.open) {
        openHandler()
    } else if (isExpanding.value || details.value?.open) {
        shrinkHandler()
    }
}

const openHandler = (): void => {
    details.value!.style.height = `${details.value?.offsetHeight}px`
    details.value!.open = true

    window.requestAnimationFrame(() => expandHandler())
}

const expandHandler = (): void => {
    isExpanding.value = true

    const startHeight = `${details.value?.offsetHeight}px`
    const endHeight = `${
        summary.value!.offsetHeight + expand.value!.offsetHeight
    }px`

    animation.value?.cancel()
    icon.value?.classList.add('open')
    animation.value = details.value!.animate(
        { height: [startHeight, endHeight] },
        { duration: 300, easing: 'ease-out' }
    )
    animation.value!.onfinish = () => {
        onAnimationFinish(true)
        emit('expand')
    }
    animation.value!.oncancel = () => (isExpanding.value = false)
}

const shrinkHandler = (): void => {
    isShrinking.value = true

    const startHeight = `${details.value?.offsetHeight}px`
    const endHeight = `${summary.value?.offsetHeight}px`

    animation.value?.cancel()
    icon.value?.classList.remove('open')
    animation.value = details.value!.animate(
        { height: [startHeight, endHeight] },
        { duration: 300, easing: 'ease-out' }
    )

    animation.value!.onfinish = () => {
        onAnimationFinish(false)
        emit('shrink')
    }
    animation.value!.oncancel = () => (isShrinking.value = false)
}

const onAnimationFinish = (open: boolean): void => {
    details.value!.style.height = details.value!.style.overflow = ''
    details.value!.open = open
    isShrinking.value = false
    isExpanding.value = false
    animation.value = null
}
</script>

<template lang="pug">
details.ui-details(ref='details', @click='detailsHandler')
    summary.ui-details__summary(ref='summary', @click='titleHandler')
        .ui-details__title
            slot(name='title')
            UiIcon.ui-details__icon(ref='icon', :icon='EnumIcon.DetailsArrow')
        slot(name='content')
    .ui-details__expand(ref='expand')
        hr
        slot(name='expand')
</template>

<style lang="sass" scoped>
.details
    &__summary
        display: grid
        grid-auto-flow: row
        row-gap: 8px
        padding: 16px
        cursor: pointer

    &__title
        display: flex
        justify-content: space-between
        align-items: center

    &__icon
        transition: transform $transition-25 ease-out

        &.open
            transform: rotate(-180deg)

    &__expand
        padding: 0 16px 16px

        & hr
            margin-bottom: 16px
</style>
