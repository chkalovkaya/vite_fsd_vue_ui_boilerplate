<script lang="ts" setup>
defineOptions({ name: 'UiAccordion' })

const beforeEnter = (element: Element) => {
    if (element instanceof HTMLElement) {
        requestAnimationFrame(() => {
            if (!element.style.height) {
                element.style.height = '0px'
            }

            element.style.display = ''
        })
    }
}
const enter = (element: Element) => {
    if (element instanceof HTMLElement) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                element.style.height = `${element.scrollHeight}px`
            })
        })
    }
}
const afterEnter = (element: Element) => {
    if (element instanceof HTMLElement) {
        element.style.height = ''
    }
}
const beforeLeave = (element: Element) => {
    if (element instanceof HTMLElement) {
        requestAnimationFrame(() => {
            if (!element.style.height) {
                element.style.height = `${element.offsetHeight}px`
            }
        })
    }
}
const leave = (element: Element) => {
    if (element instanceof HTMLElement) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                element.style.height = '0px'
            })
        })
    }
}
const afterLeave = (element: Element) => {
    if (element instanceof HTMLElement) {
        element.style.height = ''
    }
}
</script>

<template lang="pug">
transition(
    enter-active-class='enter-active',
    leave-active-class='leave-active',
    @before-enter='beforeEnter',
    @enter='enter',
    @after-enter='afterEnter',
    @before-leave='beforeLeave',
    @leave='leave',
    @after-leave='afterLeave')
    slot
</template>

<style lang="sass" scoped>
.enter-active,
.leave-active
    overflow: hidden
    transition: height $transition-25
</style>
