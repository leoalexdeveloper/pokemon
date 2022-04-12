<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
<NavBar />
<router-view></router-view>
</template>

<style>
html{
    font-size: 12px;
}
body{
    width:100vw;
    height:auto;
    overflow-x: hidden;
}
</style>