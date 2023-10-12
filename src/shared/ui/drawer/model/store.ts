import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { EnumDrawers } from './enum'

const initState = () => {
    let drawers: any = {}
    let key: keyof typeof EnumDrawers
    for (key in EnumDrawers) {
        drawers[EnumDrawers[key]] = false
    }
    return drawers
}
const drawerState = initState()

export const useDrawerStore = defineStore('Drawer', () => {
    const drawers = ref(drawerState)

    const getDrawer = computed(() => (name: EnumDrawers | string) => {
        if (!drawers.value[name]) drawers.value[name] = false
        return drawers.value[name]
    })

    function setDrawer(name: EnumDrawers | string, isOpen: boolean) {
        drawers.value[name] = isOpen
    }

    return { drawers, getDrawer, setDrawer }
})
