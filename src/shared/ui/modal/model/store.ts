import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { EnumModals } from './enum'

const initState = () => {
    let modals: any = {}
    let key: keyof typeof EnumModals
    for (key in EnumModals) {
        modals[EnumModals[key]] = false
    }
    return modals
}
const modalsState = initState()

export const useModalStore = defineStore('Modal', () => {
    const modals = ref(modalsState)

    const getModal = computed(() => (name: EnumModals) => modals.value[name])

    function setModal(name: EnumModals, isOpen: boolean) {
        modals.value[name] = isOpen
    }

    return { modals, getModal, setModal }
})
