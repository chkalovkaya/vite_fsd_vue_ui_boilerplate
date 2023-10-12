import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { EnumWindowBreakpoints } from './enum'

export const useAppStore = defineStore('app', () => {
    const windowState = ref({ width: 20, height: 0 })

    const getWindow = computed(() => windowState.value)
    const getIsBreakpoint = computed(
        () => (breakpoint: EnumWindowBreakpoints, condition: 'more' | 'less') =>
            condition === 'more'
                ? windowState.value.width >= breakpoint
                : windowState.value.width < breakpoint
    )

    function setWindow() {
        windowState.value.width = window.innerWidth
        windowState.value.height = window.innerHeight
    }

    return { windowState, getWindow, getIsBreakpoint, setWindow }
})
