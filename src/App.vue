<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { useStore } from 'vuex'
const store = useStore()
 
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
    max-height:100vh;
    overflow-x: hidden;
    background-image:url('../public/img/bg.jpg');
    background-repeat: no-repeat;
    background-size:cover;
    background-position: center;
    background-attachment: fixed;
    
}
</style>