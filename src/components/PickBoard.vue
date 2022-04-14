<template>
    <div :class="PickBoardClasses.container">
            <Card v-for:="(pokemon, index) in store.state.createTeam.pokemonList.results"
                  :pokemon="pokemon"
                  :key="index" />
    </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import Card from '../components/Card.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const PickBoardClasses = {
    container: "container pickboard-container container d-flex flex-row flex-wrap justify-content-between p-2"
}

const requestPokemons = (range: number[]) => {
    store.dispatch('getPokemonList', range)
}

onBeforeMount(()=>{
    const limit = store.state.createTeam.maxElementsToShow
    const offset = ((Number(route.params.page) * store.state.createTeam.maxElementsToShow) - store.state.createTeam.maxElementsToShow)
    store.dispatch('getPokemonList', [limit, offset])
})

</script>

<style scoped>
.container{
    max-width: auto;
    min-width: 800px;
    height:100%;
    background-color: rgba(255,255,255,0.2);
}
</style>