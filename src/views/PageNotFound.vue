<template>
    <div class="container p-4 bg-light mt-2 rounded w-100">
        <p class="fs-2 text-danger"></p>       
        <p class="fs-1 h1 lead text-primary">Oh no! <br>This page was not found - 404</p> 
        <hr>
        <button class="btn btn-primary" v-on:click="$router.back()">Go back</button>
        
        <object class="image img-fluid m-auto p-1 d-flex justify-content-center rounded-circle border border-5 border-secondary" :src="returnLinks()[0]" :data="returnLinks()[0]" type="image/png">
            <img :src="returnLinks()[1]">
        </object>  
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'

const route = useRoute()
const store = useStore()

const baseURL = store.state.createTeam.baseURL
const Pokemon = {
    random(): string {
        return String(Math.round(Math.random()*100))
    }
}

const returnLinks = (): Array<string> => {
    const random:string = Pokemon.random()
    return [
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${random}.svg`,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${random}.png`
    ]
}
</script>

<style scoped>
.container{
    max-width:1300px;
}
.image{
    height: 40rem;
    object-fit: contain;
    object-position: center;
}
</style>