<template>
    <div :class="PickBoardClasses.container">
            <Card v-for:="(pokemon, index) in store.state.createTeam.pokemonList.results"
                  :pokemon="pokemon"
                  :key="index" />
    </div>
</template>

<script lang="ts" setup>
import { defineProps, watch } from 'vue'
import Card from '@/components/Card.vue'
import { useStore } from 'vuex'

const store = useStore()

const PickBoardClasses = {
    container: "container pickboard-container container pb-4 d-flex flex-row flex-wrap justify-content-between "
}

</script>

<style>
.container{
    min-width: 600px;
}
</style>