<script lang="ts" setup>
import { useDebounce } from '@shared/lib'

defineOptions({ name: 'UiInfinite' })
const emit = defineEmits(['infinite'])
const onIntersect = useDebounce(() => emit('infinite'))
</script>

<template lang="pug">
.ui-infinite(v-intersection='onIntersect')
</template>
