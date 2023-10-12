<script setup lang="ts">
defineOptions({ name: 'ErrorPage' })
defineProps({
    errorCode: {
        type: Number,
        default: 404,
    },
    message: {
        type: String,
        default: 'Что-то пошло не так, попробуйте позже.',
    },
})
</script>

<template lang="pug">
.center {{ message }}
</template>

<style lang="sass" scoped>
.center
    margin: 0 auto
</style>
