<template>
    <div class="createTeam">
        <RegisterTeamForm v-if:="!store.state.createTeam.currentTeamObject.name" />
        
        <TeamBoard v-if:="store.state.createTeam.currentTeamObject.name" />

        <Pagination v-if:="store.state.createTeam.currentTeamObject.name" 
                    v-on:emitqueryrange="requestPokemons"/>

        <router-view v-slot="{Component}">
            <transition name="transition" mode="out-in">
                <component :is="Component" v-if:="store.state.createTeam.currentTeamObject.name" :key="route.path"></component>
            </transition>
        </router-view>

    </div>
</template>

<script lang="ts" setup>
import RegisterTeamForm from '@/components/RegisterTeamForm.vue'
import Pagination from '@/components/Pagination.vue'
import { useStore } from 'vuex'
import { onMounted, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import Card from '../components/Card.vue'
import TeamBoard from '@/components/TeamBoard.vue'

const store = useStore()
const route = useRoute()

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
    .transition-enter-active,
    .transition-leave-active{
        transition: opacity 1s, transform 1s
    }

    .transition-enter-from,
    .transition-leave-to{
        opacity:0;
        transform: translateY(100%)
    }
  
  .createTeam{
      height:auto;
  }
</style>