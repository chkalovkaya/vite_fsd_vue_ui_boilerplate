<script setup lang="ts">
defineOptions({ name: 'UiNodata' })
</script>
<template lang="pug">
.ui-nodata
    p По вашему запросу нет данных
</template>

<style lang="sass" scoped>
.ui-nodata
    width: 100%
    height: 205px
    display: flex
    align-items: center
    justify-content: center
    font-size: 20px
    font-weight: 600
    line-height: 24px
</style>
