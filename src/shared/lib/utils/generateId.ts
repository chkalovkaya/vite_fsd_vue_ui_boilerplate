import { computed } from 'vue'

export const useGenerateId = (name = '') =>
    computed(() => `id-${name}-${Math.floor(Math.random() * 100000)}`).value
